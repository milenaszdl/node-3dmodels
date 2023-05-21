const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(express.json());

module.exports = router;

const modelsController = require("../controllers/controller");

const jsonParser = bodyParser.json({
    extended: false,
});

router.get("/models", modelsController.getAllModels);

module.exports = router;