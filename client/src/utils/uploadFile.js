import axios from 'axios';
import { API_URL } from '../constants';

export default async function uploadFile(fileData, path) {
  const { file, fileExtension } = fileData;
  // eslint-disable-next-line max-len
  const { data } = await axios.get(`${API_URL}/files/upload-url?type=${file.type}&extension=${fileExtension}&path=${path}`);
  const { filename, uploadUrl, location } = data;

  await axios.put(uploadUrl, file, { headers: { 'Content-Type': file.type } });

  return {
    filename,
    url: location,
  };
}
