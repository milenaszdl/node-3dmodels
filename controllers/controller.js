const modelServices = require('../services/modelservices');
const { ObjectId } = require('mongodb');

async function getAllModels(req, res) {
    let allModels = await modelServices.findComments();
    res.json(allModels);
}

module.exports = {
    getAllModels,
  }