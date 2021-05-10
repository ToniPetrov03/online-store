import axios from 'axios';
import { API_URL, STORAGE_URL } from '../constants';

export default async function uploadFile(fileData, path) {
  const { file, fileExtension } = fileData;
  // eslint-disable-next-line max-len
  const { data } = await axios.get(`${API_URL}/files/upload-url?type=${file.type}&extension=${fileExtension}&path=${path}`);
  const { filename, url } = data;

  await axios.put(url, file, { headers: { 'Content-Type': file.type } });

  return {
    filename,
    url: `${STORAGE_URL}/${path}/${filename}`,
  };
}
