import models from '../models'
import Sequelize from 'sequelize';

const { product, image } = models

export function create(req, res) {
  const { name, description, price, images } = req.body;

  if (!name) {
    res.status(400).send({
      message: 'Name cannot be empty.'
    });
  }

  if (!price) {
    res.status(400).send({
      message: 'Price cannot be empty.'
    });
  }

  if (!description) {
    res.status(400).send({
      message: 'Description cannot be empty.'
    });
  }

  if (!images.length) {
    res.status(400).send({
      message: 'Images cannot be empty.'
    });
  }

  if (images.filter(img => img.main).length > 1) {
    res.status(400).send({
      message: 'You can have maximum of one main image.'
    });
  }

  return product.create({ name, description, price, images }, { include: image })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Something went wrong when creating a product.'
    }))
}

export function findAll(req, res) {
  return product.findAll({
    where: {
      name: {
        [Sequelize.Op.substring]: req.query.name || ''
      }
    },
    include: image
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Something went wrong when finding all products.'
    }))
}

export function find(req, res) {
  return product.findAll({
    where: {
      id: req.params.id
    },
    include: image,
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Something went wrong when finding a product.'
    }))
}
