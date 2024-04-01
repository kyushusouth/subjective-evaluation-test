import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SchemaType } from "@/app/eval/schema";

export default function Confirm({ onPrev }: { onPrev: () => void }) {
  const methods = useFormContext<SchemaType>();

  const { handleSubmit } = methods;

  const [sendData, setSendData] = useState<SchemaType | null>(null);

  function onSubmit(data: SchemaType) {
    console.log("success", data);
    setSendData(data);
  }

  function onError(error: SchemaType) {
    console.log("error", error);
  }

  useEffect(() => {
    handleSubmit(onSubmit, onError)();
  }, []);

  return (
    <div>
      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button variant="contained" onClick={onPrev}>
          戻る
        </Button>
        <Button
          variant="contained"
          onClick={() => console.log(JSON.stringify(sendData))}
          disabled={!sendData}
        >
          送信
        </Button>
      </Box>
    </div>
  );
}
