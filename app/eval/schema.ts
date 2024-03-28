import { object, number, InferType } from 'yup';

interface Obj {
    [prop: string]: any
}

const numSamples = 120

const keys = [];
for (let i = 1; i <= numSamples; i++) {
    keys.push(`${i}_naturalness_label`);
    keys.push(`${i}_intelligibility_label`);
}

const obj: Obj = {}
for (let key of keys) {
    obj[key] = number();
}

export const Schema = object(obj)

export type SchemaType = InferType<typeof Schema>;