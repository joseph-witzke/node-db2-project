const Car = require('../cars/cars-model');
const db = require('../../data/db-config');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Car.getById(id)
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
  if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage) {
    res.status(400).json({ message: ' Required field is missing' });
  } else {
    req.car = req.body;
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  try {
    const { vin } = req.body;
    if (vinValidator.validate(vin)) {
      next();
    } else {
      next({ status: 400, message: `vin ${vin} is invalid` });
    }
  } catch (err) {
    next(err);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.body;
    const exists = await db('cars').where('vin', vin);
    if (!exists) {
      next();
    } else {
      next({ status: 400, message: `vin ${vin} already exists` });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
