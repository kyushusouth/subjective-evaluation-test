import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv';

dotenv.config({ path: "../.env" });
const domainName = process.env.GCS_DOMAIN_NAME
const bucketName = process.env.GCS_BUCKET_NAME
const prisma = new PrismaClient()

export default async function Index() {
  const users = await prisma.respondents.findMany()
  const sampleMetaDataList = await prisma.sampleMetaData.findMany()
  const urlList = []
  for (let sampleMetaData of sampleMetaDataList) {
    urlList.push(domainName + "/" + bucketName + "/" + sampleMetaData.file_path)
  }

  return (
    <div>
      {urlList.map((url, index) => (
        <div key={index}>
          <audio src={url} controls controlsList="nodownload"></audio>
        </div>
      ))}
    </div>
  )
}
