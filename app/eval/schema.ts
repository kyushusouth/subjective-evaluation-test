import { object, number, InferType } from "yup";

interface Obj {
  [prop: string]: any;
}

const numSamples = 120;

const keys = [];
for (let i = 1; i <= numSamples; i++) {
  keys.push(`naturalness_${i}`);
  keys.push(`intelligibility_${i}`);
}

const obj: Obj = {};
for (const key of keys) {
  obj[key] = number();
}

export const Schema = object(obj);

export type SchemaType = InferType<typeof Schema>;
