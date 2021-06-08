const Car = require('../cars/cars-model');
const db = require('../../data/db-config');

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Car.getById(req.params.id)
    .then((car) => {
      if (!car) {
        res.status(404).json({ message: `car with id ${id} is not found` });
      } else {
        req.car = car;
        next();
      }
    })
    .catch(next);
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
