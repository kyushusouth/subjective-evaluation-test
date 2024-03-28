"use client";

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import EvalForm from "@/app/eval/form";
import Confirm from '@/app/eval/confirm';
import { SchemaType } from "@/app/eval/schema";


export default function Page() {
    const methods = useForm<SchemaType>({
        mode: "onBlur",
    })
    const [pageNumber, setPageNumber] = useState(1);
    const [sampleMetaDataList, setSampleMetaDataList] = useState([]);
    const [domainName, setDomainName] = useState("");
    const [bucketName, setBucketName] = useState("");
    const numSamplePerPage = 10;
    const lastPageNumber = Math.ceil(sampleMetaDataList.length / numSamplePerPage);

    const onNext = () => {
        setPageNumber(state => state + 1);
    };

    const onPrev = () => {
        setPageNumber(state => state - 1);
    };

    useEffect(() => {
        let ignore = false;

        const fetchSampleMetaData = async () => {
            const res = await fetch("api/sampleMetaData", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            })
            const data = await res.json();
            if (!ignore) {
                setSampleMetaDataList(data);
            }
        }

        const fetchDomainName = async () => {
            const res = await fetch("api/domainName", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            })
            const data = await res.json();
            if (!ignore) {
                setDomainName(data);
            }
        }

        const fetchBucketName = async () => {
            const res = await fetch("api/bucketName", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "GET",
            })
            const data = await res.json();
            if (!ignore) {
                setBucketName(data);
            }
        }

        fetchSampleMetaData();
        fetchDomainName();
        fetchBucketName();

        return () => {
            ignore = true;
        }
    }, [])

    return (
        <div>
            <div>
                <FormProvider {...methods}>
                    <form>
                        {
                            pageNumber === (lastPageNumber + 1) ?
                                <Confirm onPrev={onPrev} /> :
                                <EvalForm onNext={onNext} onPrev={onPrev} sampleMetaDataList={sampleMetaDataList.slice(10 * (pageNumber - 1), 10 * pageNumber)} domainName={domainName} bucketName={bucketName} pageNumber={pageNumber} />
                        }
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}