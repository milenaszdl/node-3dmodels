const modelServices = require('../services/modelservices');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json({
    extended: false,
});

async function getAllModels(req, res) {
    let allModels = await modelServices.findAllModels();
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
    userid = req.query.APIkey;
    const authorisationerror = await signin(userid);
    if (authorisationerror){
        const err = new Error ("no user with such apikey");
        err.status=401;
        next(err);
    }
    try{
        const id = req.params.id;
        let findtodel = await modelServices.findOneModel(id);
        if (!findtodel) {
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
            error.status = 400;
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

async function deleteOneApiKey(req,res,next){
    try{
        const deleteid = req.query.APIkey;
        const check = await modelServices.finduserbyid(deleteid);
        if (!check) {
            const err = new Error('no user with such apikey');
            err.status = 404;
            throw err;
        }
        else {
            await modelServices.deleteapikey(deleteid);
            res.send('user successfully deleted!');
        }
    }
    catch (err) {
        next(err);
    }
}

//вспомогательная функция
async function signin(id){
    const check = await modelServices.finduserbyid(userid);
        if (!check){
            const err = new Error ("no user with such apikey");
            return err;
        }
}

async function addModel(req, res, next) {
    userid = req.query.APIkey;
    const authorisationerror = await signin(userid);
    if (authorisationerror){
        const err = new Error ("no user with such apikey");
        err.status=400;
        return next(err);
    }

    const modeldata = req.body;
    //проверка жесть
    try {
        if (!modeldata){
            const err = new Error ("u didnt send any model data (");
            err.status=400;
            throw(err);
        } else {
            if (!modeldata.username || typeof modeldata.username !== "string") {
                const err = new Error ("wrong username parameter");
                err.status=400;
                throw(err);
            } else if (!modeldata.modelname || typeof modeldata.modelname !== "string") {
                const err = new Error ("wrong modelname parameter");
                err.status=400;
                throw(err);
            } else if (!modeldata.modeltype || typeof modeldata.modeltype !== "string") {
                const err = new Error ("wrong modeltype parameter");
                err.status=400;
                throw(err);
            }
        }
    }
    catch(err) {
        return next(err);
    }

    const newModelData = {...modeldata};
    //добавляем описаниеи комментраии если их нет
    if (!newModelData.description){
        newModelData.description = "new model";
    }

    if(!newModelData.comments){
        newModelData.comments = ["hi bish", " guys ive created new model"];
    }

    const date = new Date();
    newModelData.creationdate = date;
    newModelData.lastchange = date;

    try {
        const result = await modelServices.addModel(newModelData);
        if (result) {
            res.send('model has been added!');
        }
        else {
            const err = new Error("server could not add the model");
            err.status = 501;
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
}

async function updateModel(req, res, next){
    userid = req.query.APIkey;
    const authorisationerror = await signin(userid);
    if (authorisationerror){
        const err = new Error ("no user with such apikey");
        err.status=401;
        next(err);
    }

    const modelid = req.params.id;

    let findtoupd = await modelServices.findOneModel(modelid);
    if (!findtoupd) {
        const err = new Error('no model with such id');
        err.status = 404;
        throw err;
    }

    const modeldata = req.body;

    try {
        if (!modeldata){
            const err = new Error ("u didnt send any model data (");
            err.status=400;
            throw(err);
        } else {
            if (!modeldata.username || typeof modeldata.username !== "string") {
                const err = new Error ("wrong username parameter");
                err.status=400;
                throw(err);
            } else if (!modeldata.modelname || typeof modeldata.modelname !== "string") {
                const err = new Error ("wrong modelname parameter");
                err.status=400;
                throw(err);
            } else if (!modeldata.modeltype || typeof modeldata.modeltype !== "string") {
                const err = new Error ("wrong modeltype parameter");
                err.status=400;
                throw(err);
            }
        }
    }
    catch(err) {
        next(err);
    }

    const updmodeldata = {...modeldata};

    updmodeldata.lastchange = new Date();

    try {
        const result = await modelServices.updateModel(modelid, updmodeldata);
        if (result) {
            res.send('model has been updated!');
        }
        else {
            const err = new Error("server could not update the model");
            err.status = 501;
            next(err);
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
    deleteOneApiKey,
    addModel,
    updateModel,
}