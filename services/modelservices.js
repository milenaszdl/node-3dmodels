const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../configs/connectdb");

let db;

connectToMongoDB() //пример промиса
  .then((result) => {
    db = result;
  })
  .catch((err) => console.log(err));

console.log(db);

async function findAllModels() {
    const models = db.collection("models");
    const result = await models.find();
    return result.toArray();
}

module.exports = {
  findAllModels,
};