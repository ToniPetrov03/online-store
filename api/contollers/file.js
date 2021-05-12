import s3Sdk from '@aws-sdk/client-s3';
import s3Presigner from '@aws-sdk/s3-request-presigner';
import { v4 } from 'uuid';
import { bucket, client, expiresIn, s3Location } from '../config/s3';

const { PutObjectCommand } = s3Sdk;
const { getSignedUrl } = s3Presigner;

export async function getUploadUrl(req, res) {
  const { extension, type, path } = req.query;
  const filename = `${v4()}.${extension}`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `${path}/${filename}`,
    ContentType: type
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn });
  const location = `${s3Location}/${path}/${filename}`;

  res.send({ uploadUrl, expiresIn, location, filename })
}
