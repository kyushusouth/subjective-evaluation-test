"use client";

/* eslint-disable no-restricted-syntax */
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { SchemaType } from "@/app/eval/schema";
import { SampleMetaData, Respondents } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function Confirm({
  onPrev,
  sampleMetaDataList,
  respondent,
}: {
  onPrev: () => void;
  sampleMetaDataList: SampleMetaData[];
  respondent: Respondents;
}) {
  const router = useRouter();
  const methods = useFormContext<SchemaType>();
  const { handleSubmit } = methods;
  const [sendData, setSendData] = useState<SchemaType | null>(null);

  function onSubmit(data: SchemaType) {
    setSendData(data);
  }

  function onError(error: SchemaType) {
    console.log("error", error);
  }

  useEffect(() => {
    handleSubmit(onSubmit, onError)();
  }, []);

  const handleClick = () => {
    const fetchDataList = async (dataList: object[]) => {
      const response = await fetch("api/answers", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataList),
        method: "POST",
      });
      const result = await response.json();
      if (result.success) {
        router.push("/");
      } else {
        router.push("/eval");
      }
    };

    if (sendData === null) {
      console.error("sendData is null.");
      return;
    }
    const dataList = [];
    for (const sampleMetaData of sampleMetaDataList) {
      const sampleId = Number(sampleMetaData.id);
      const naturalness = Number(sendData[`naturalness_${sampleId}`]);
      const intelligibility = Number(sendData[`intelligibility_${sampleId}`]);
      dataList.push({
        respondent_id: respondent.id,
        sample_meta_data_id: sampleId,
        naturalness_id: naturalness,
        intelligibility_id: intelligibility,
      });
    }
    fetchDataList(dataList);
  };

  return (
    <Container
      sx={{
        my: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Button variant="contained" onClick={onPrev}>
        戻る
      </Button>
      <Button variant="contained" onClick={handleClick} disabled={!sendData}>
        送信
      </Button>
    </Container>
  );
}
