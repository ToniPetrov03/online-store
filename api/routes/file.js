import express from 'express';
import { getUploadUrl } from '../contollers/file.js';

export default function (app) {
  const router = express.Router();
  router.get('/upload-url', getUploadUrl);

  app.use('/api/files', router);
}
