import Models from '../models'

export function create(req, res) {
  const {name, description, price} = req.body;

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

  return Models.Product.create({name, description, price})
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
