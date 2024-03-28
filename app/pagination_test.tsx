'use client';

import { fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/components/pagination";
import Eval from "@/components/eval"
import { Button } from "@/components/handlerTest";
import { fetchFilteredWavFiles } from "@/app/lib/data";
import React, { useState } from 'react';

export default async function Index({
  searchParams
}: {
  searchParams?: {
    page?: string;
  }
}) {
  const [data, setData] = useState();
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages();
  const sampleMetaDataList = await fetchFilteredWavFiles(currentPage);

  return (
    <div>
      <h1>Root Page</h1>

      <div>
        <Button></Button>
      </div>

      <Eval currentPage={currentPage} data={data} setData={setData}></Eval>

      <div className="my-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
