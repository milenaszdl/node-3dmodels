const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../configs/connectdb");

let db;

connectToMongoDB() //пример промиса
  .then((result) => {
    db = result;
    modelcollection = db.collection("models");
    keycollection = db.collection("keys");
  })
  .catch((err) => console.log(err));

console.log(db);

async function findAllModels() {
    const result = await modelcollection.find();
    return result.toArray();
}

async function findOneModel(id){
  const result = await modelcollection.findOne({ _id: new ObjectId(id) });
  return result;
}

async function deleteModel(id){
  const result = await modelcollection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

//вспомогательная функция для авторизации по ключу и проверок
async function finduserbyid(id){
  const result = await keycollection.findOne({ _id: new ObjectId(id) });
  return result;
}

async function findapikey(name){
  const keybyname = await keycollection.findOne({username: name});
  if(keybyname){
    return keybyname._id;
  }
  else if (keybyname===null){
    await keycollection.insertOne({
      username: name,
    });
    const newuserid = await keycollection.findOne({username: name});
    return newuserid._id;
  }
}

async function deleteapikey(id){
  const result = await keycollection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

async function addModel(model) {
  try {
      return modelcollection.insertOne(model);
  }
  catch (err) {
      throw err;
  }
}

async function updateModel(modelid, newmodeldata) {
  return await modelcollection.updateOne({_id: new ObjectId(modelid)}, {
    $set: newmodeldata
  });
}

module.exports = {
  findAllModels,
  findOneModel,
  deleteModel,
  finduserbyid,
  findapikey,
  deleteapikey,
  addModel,
  updateModel,
};