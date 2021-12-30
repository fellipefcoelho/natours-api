const express = require('express');
const tourController = require('./../controllers/tourController');
const fs = require('fs');

const router = express.Router();

router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.postTour);
router
    .route('/:id')
    .get(tourController.getToursById)
    .patch(tourController.patchTour)
    .delete(tourController.deleteTour);

module.exports = router;


