import s3Sdk from '@aws-sdk/client-s3';

const { S3Client } = s3Sdk;
const clientParams = {
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  },
  region: process.env.S3_REGION,
}

export const bucket = process.env.BUCKET;
export const expiresIn = 120;
export const client = new S3Client(clientParams);
