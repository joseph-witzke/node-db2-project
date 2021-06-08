const router = require('express').Router();
const Car = require('./cars-model');
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('../cars/cars-middleware');

router.get('/', (req, res, next) => {
  Car.getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {});

router.post('/', (req, res, next) => {});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    custom: 'something went wrong with your request',
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
