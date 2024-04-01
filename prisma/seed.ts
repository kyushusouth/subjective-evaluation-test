import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "@google-cloud/storage";

dotenv.config({ path: "../.env" });
const prisma = new PrismaClient();
const storage = new Storage();

function getWavFilesInDirectory(directoryPath: string): string[] {
  const files: string[] = [];
  const savePath: string[] = [];
  const items = fs.readdirSync(directoryPath);
  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      files.push(...getWavFilesInDirectory(itemPath));
    } else if (stats.isFile() && itemPath.endsWith(".wav")) {
      files.push(itemPath);
    }
  }
  return files;
}

function generateRandomString(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset[randomIndex];
  }
  return result;
}

async function listFiles(bucketName: string) {
  const [files] = await storage.bucket(bucketName).getFiles();
  return files;
}

async function uploadFile(
  bucketName: string,
  filePath: string,
  destFileName: string,
) {
  const options = {
    destination: destFileName,
  };
  await storage.bucket(bucketName).upload(filePath, options);
}

async function deleteFile(bucketName: string, fileName: string) {
  await storage.bucket(bucketName).file(fileName).delete();
}

async function main() {
  const localWavDir = process.env.LOCAL_WAV_DIR;
  if (localWavDir === undefined) {
    console.error("LOCAL_WAV_DIR was not specified.");
    return;
  }
  const bucketName = process.env.GCS_BUCKET_NAME;
  if (bucketName === undefined) {
    console.error("GCS_BUCKET_NAME was not specified.");
    return;
  }

  // const numRespondents = 30;
  // for (let i = 0; i < numRespondents; i++) {
  //     await prisma.respondents.create({
  //         data: {
  //             name: uuidv4(),
  //             password: generateRandomString(8),
  //             sex: "",
  //             age: -1,
  //         },
  //     })
  // }

  const gcsFiles = await listFiles(bucketName);
  for (let file of gcsFiles) {
    await deleteFile(bucketName, file.name);
  }

  const filePathList = getWavFilesInDirectory(localWavDir);
  for (let filePath of filePathList) {
    const filePathParts = filePath.split("/");
    const speakerName = filePathParts[filePathParts.length - 3];
    const modelName = filePathParts[filePathParts.length - 5];
    const sampleName = filePathParts[filePathParts.length - 2];
    const kind = filePathParts[filePathParts.length - 1].split(".")[0];
    const randomizedFilePath = uuidv4() + ".wav";
    uploadFile(bucketName, filePath, randomizedFilePath);
    await prisma.sampleMetaData.create({
      data: {
        file_path: randomizedFilePath,
        speaker_name: speakerName,
        model_name: modelName,
        sample_name: sampleName,
        kind: kind,
      },
    });
  }

  const naturalnessItemList = [
    "非常に悪い",
    "悪い",
    "普通",
    "良い",
    "非常に良い",
  ];
  for (let naturalnessItem of naturalnessItemList) {
    await prisma.naturalnessItem.create({
      data: {
        item: naturalnessItem,
      },
    });
  }

  const intelligibilityItemList = [
    "非常に悪い",
    "悪い",
    "普通",
    "良い",
    "非常に良い",
  ];
  for (let intelligibilityItem of intelligibilityItemList) {
    await prisma.intelligibilityItem.create({
      data: {
        item: intelligibilityItem,
      },
    });
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
