import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from "@/app/lib/prisma"

const ITEMS_PER_PAGE = 10;

export async function fetchAllwavFiles() {
    noStore()
    try {
        const sampleMetaDataList = await prisma.sampleMetaData.findMany();
        return sampleMetaDataList
    } catch (error) {
        console.error("Strage Error:" + error);
        throw new Error("Failed to fetch all wav files.")
    }
}

export async function fetchInvoicesPages() {
    noStore()
    try {
        const sampleMetaDataList = await prisma.sampleMetaData.findMany()
        const count = sampleMetaDataList.length;
        const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Storage Error:', error);
        throw new Error('Failed to fetch total number of wavfiles.');
    }
}

export async function fetchFilteredWavFiles(currentPage: number) {
    noStore();
    try {
        const sampleMetaDataList = await prisma.sampleMetaData.findMany({
            where: {
                id: {
                    gt: ITEMS_PER_PAGE * currentPage - ITEMS_PER_PAGE,
                    lte: ITEMS_PER_PAGE * currentPage,
                }
            }
        })
        return sampleMetaDataList
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch sampleMetaDataList.")
    }
}