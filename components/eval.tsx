// import { fetchFilteredWavFiles } from "@/app/lib/data";
// import { domainName, bucketName } from "@/app/lib/env"

// interface FormData {
//     sampleMetaData: object;
//     intelligibility?: string;
//     naturalness?: string;
// }

// export default async function Page({
//     currentPage,
//     data,
//     setData,
// }: {
//     currentPage: number;
// }) {
//     const sampleMetaDataList = await fetchFilteredWavFiles(currentPage)

//     return (
//         <div>

//             <form action="">
//                 {sampleMetaDataList.map((sampleMetaData, index) => {
//                     const sampleId = sampleMetaData.id
//                     const sampleUrl = domainName + "/" + bucketName + "/" + sampleMetaData.file_path
//                     return (
//                         <div key={sampleId} className="mb-5">
//                             <p>{sampleUrl}</p>
//                             <audio src={sampleUrl} controls controlsList="nodownload"></audio>
//                             <select>
//                                 <option value="------">------</option>
//                                 <option value="apple">Apple</option>
//                                 <option value="banana">Banana</option>
//                                 <option value="orange">Orange</option>
//                             </select>
//                         </div>
//                     )
//                 })}
//             </form>
//         </div>
//     )
// }