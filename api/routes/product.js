import express from 'express';
import { create, find, findAll } from '../contollers/product.js';

export default function (app) {
  const router = express.Router();
  router.post('/', create);
  router.get('/', findAll);
  router.get('/:id', find)

  app.use('/api/products', router);
}
