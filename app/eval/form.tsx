import { useFormContext, Controller } from "react-hook-form";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SampleMetaData } from "@prisma/client";
import { SchemaType } from "@/app/eval/schema";


export default function Form({
    onNext,
    onPrev,
    sampleMetaDataList,
    domainName,
    bucketName,
    pageNumber,
}: {
    onNext: () => void;
    onPrev: () => void;
    sampleMetaDataList: SampleMetaData[];
    domainName: string;
    bucketName: string;
    pageNumber: number;
}) {
    const methods = useFormContext<SchemaType>();

    const {
        register,
        getValues,
        control,
        formState: { errors },
    } = methods;

    return (
        <div>
            {sampleMetaDataList.map((data, index) => {
                const sampleId = data.id
                const sampleUrl = domainName + "/" + bucketName + "/" + data.file_path
                return (
                    <div key={sampleId}>
                        <div>{sampleId}: {sampleUrl}</div>
                        <audio src={sampleUrl} controls controlsList="nodownload"></audio>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id={`${sampleId}_naturalness_label`}>自然性</InputLabel>
                            <Select
                                labelId={`${sampleId}_naturalness_label`}
                                label={`${sampleId}_naturalness`}
                                {...register(`${sampleId}_naturalness`)}
                                defaultValue={getValues(`${sampleId}_naturalness`)}
                            >
                                <MenuItem value={1}>1: 非常に悪い</MenuItem>
                                <MenuItem value={2}>2: 悪い</MenuItem>
                                <MenuItem value={3}>3: 普通</MenuItem>
                                <MenuItem value={4}>4: 良い</MenuItem>
                                <MenuItem value={5}>5: 非常に良い</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id={`${sampleId}_intelligibility_label`}>明瞭性</InputLabel>
                            <Select
                                labelId={`${sampleId}_intelligibility_label`}
                                label={`${sampleId}_intelligibility`}
                                {...register(`${sampleId}_intelligibility`)}
                                defaultValue={getValues(`${sampleId}_intelligibility`)}
                            >
                                <MenuItem value={1}>1: 非常に悪い</MenuItem>
                                <MenuItem value={2}>2: 悪い</MenuItem>
                                <MenuItem value={3}>3: 普通</MenuItem>
                                <MenuItem value={4}>4: 良い</MenuItem>
                                <MenuItem value={5}>5: 非常に良い</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                )
            })}
            <Box display="flex" justifyContent="center" gap={2} mt={2}>
                <Button variant="contained" onClick={onPrev} disabled={pageNumber === 1 ? true : false}>
                    戻る
                </Button>
                <Button variant="contained" onClick={onNext}>
                    次へ
                </Button>
            </Box>
        </div>
    )
}