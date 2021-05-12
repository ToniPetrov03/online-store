import s3Sdk from '@aws-sdk/client-s3';

const { S3Client } = s3Sdk;
const region = process.env.S3_REGION;
const clientParams = {
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: true,
  region,
};

export const bucket = process.env.BUCKET;
export const s3Location = process.env.S3_LOCATION;
export const expiresIn = 120;
export const client = new S3Client(clientParams);
