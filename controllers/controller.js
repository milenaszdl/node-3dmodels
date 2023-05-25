const modelServices = require('../services/modelservices');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json({
    extended: false,
});

async function getAllModels(req, res) {
    let allModels = await modelServices.findComments();
    res.json(allModels);
}

async function getOneModel(req,res,next){
    try{
        const id = req.params.id;
        let oneModel = await modelServices.findOneModel(id);
        if (!oneModel) {
            const err = new Error('no model with such id');
            err.status = 404;
            throw err;
        }
        else {
            res.json(oneModel);
        }
    }
    catch (err) {
        next(err);
    }
}

async function deleteOneModel(req,res,next){
    try{
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            const err = new Error('no model with such id');
            err.status = 404;
            throw err;
        }
        else {
            let delModel = await modelServices.deleteModel(id);
            res.send('model successfully deleted!');
        }
    }
    catch (err) {
        next(err);
    }
}

async function postApi(req,res,next){
    try{
        const {username} = req.body;
        if (username===null) {
            const error = new Error('u dont have username parameter in your request');
            error.status = 404;
            throw error;
        }
        else {
            let foundkey = await modelServices.findapikey(username);
            res.send(`this user has next apikey: ${foundkey}`);
        }
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getAllModels,
    getOneModel,
    deleteOneModel,
    postApi,
}