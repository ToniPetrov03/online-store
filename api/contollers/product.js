import Models from '../models'

export function create(req, res) {
  const {name, description, price, img} = req.body;

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

  if (!img) {
    res.status(400).send({
      message: 'Image cannot be empty.'
    });
  }

  return Models.Product.create({name, description, price, img})
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Something went wrong when creating a product.'
    }))
}

export function findAll(req, res) {
  return Models.Product.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Something went wrong when finding all products.'
    }))
}

export function find(req, res) {
  return Models.Product.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({
      message: err.message || 'Something went wrong when finding a product.'
    }))
}
