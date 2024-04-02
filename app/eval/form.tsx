import { useFormContext } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  SampleMetaData,
  NaturalnessItem,
  IntelligibilityItem,
} from "@prisma/client";
import { SchemaType } from "@/app/eval/schema";

export default function Form({
  onNext,
  onPrev,
  sampleMetaDataList,
  domainName,
  bucketName,
  naturalnessItemList,
  intelligibilityItemList,
  pageNumber,
}: {
  onNext: () => void;
  onPrev: () => void;
  sampleMetaDataList: SampleMetaData[];
  domainName: string;
  bucketName: string;
  naturalnessItemList: NaturalnessItem[];
  intelligibilityItemList: IntelligibilityItem[];
  pageNumber: number;
}) {
  const methods = useFormContext<SchemaType>();

  const {
    register,
    getValues,
    formState: { errors },
  } = methods;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 10,
      }}
    >
      {sampleMetaDataList.map((data, index) => {
        const sampleId = data.id;
        const sampleUrl = `${domainName}/${bucketName}/${data.file_path}`;
        return (
          <Card key={sampleId} sx={{ mb: 3, p: 2, width: 0.8, maxWidth: 500 }}>
            <CardContent sx={{ mb: 1, ml: 1, p: 0 }}>
              <Typography component="div">No. {sampleId}</Typography>
            </CardContent>
            <CardMedia
              src={sampleUrl}
              component="audio"
              controls
              controlsList="nodownload"
              sx={{ mb: 2, p: 0 }}
            />
            <Box
              sx={{
                p: 0,
                m: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <FormControl sx={{ p: 0, m: 0, minWidth: 120 }} size="small">
                <InputLabel id={`naturalness_${sampleId}_label`}>
                  自然性
                </InputLabel>
                <Select
                  labelId={`naturalness_${sampleId}_label`}
                  label={`naturalness_${sampleId}`}
                  {...register(`naturalness_${sampleId}`)}
                  defaultValue={getValues(`naturalness_${sampleId}`)}
                >
                  {naturalnessItemList.map((naturalnessItem, index) => (
                    <MenuItem
                      key={naturalnessItem.id}
                      value={naturalnessItem.id}
                    >
                      {naturalnessItem.id}: {naturalnessItem.item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ p: 0, m: 0, minWidth: 120 }} size="small">
                <InputLabel id={`intelligibility_${sampleId}_label`}>
                  明瞭性
                </InputLabel>
                <Select
                  labelId={`intelligibility_${sampleId}_label`}
                  label={`intelligibility_${sampleId}`}
                  {...register(`intelligibility_${sampleId}`)}
                  defaultValue={getValues(`intelligibility_${sampleId}`)}
                >
                  {intelligibilityItemList.map((intelligibilityItem, index) => (
                    <MenuItem
                      key={intelligibilityItem.id}
                      value={intelligibilityItem.id}
                    >
                      {intelligibilityItem.id}: {intelligibilityItem.item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Card>
        );
      })}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={onPrev}
          disabled={pageNumber === 1}
        >
          戻る
        </Button>
        <Button variant="contained" onClick={onNext}>
          次へ
        </Button>
      </Box>
    </Container>
  );
}
