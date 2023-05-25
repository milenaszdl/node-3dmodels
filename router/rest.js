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
router.get("/models/:id", modelsController.getOneModel);
router.delete("/models/:id", modelsController.deleteOneModel);
router.post("/api", modelsController.postApi);
router.delete("/deletekey", modelsController.deleteOneApiKey);

module.exports = router;