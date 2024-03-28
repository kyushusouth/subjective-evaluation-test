import dotenv from 'dotenv';

dotenv.config({ path: "../../.env" });

export function GET(request: Request) {
    const bucketName = process.env.GCS_BUCKET_NAME
    return Response.json(bucketName);
}