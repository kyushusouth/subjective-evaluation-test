import { fetchAllwavFiles, fetchFilteredWavFiles } from "@/app/lib/data";

export async function GET(request: Request) {
    const sampleMetaDataList = await fetchAllwavFiles();
    return Response.json(sampleMetaDataList);
}