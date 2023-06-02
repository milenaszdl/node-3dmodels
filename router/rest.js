const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

router.use(express.json());

module.exports = router;

const modelsController = require("../controllers/controller");

const jsonParser = bodyParser.json({
    extended: false,
});

router.get("/allmodels", modelsController.getAllModels);
router.get("/model/:id", modelsController.getOneModel);
router.delete("/delmodel/:id", modelsController.deleteOneModel);
router.post("/api", modelsController.postApi); //ключи
router.delete("/deletekey", modelsController.deleteOneApiKey); //ключи
router.post("/models", modelsController.addModel);
router.put("/models/:id", modelsController.updateModel);

/**
 * @swagger
 * tags:
 *  - name: APIkeys
 *    description: Add and delete APIkeys (users)
 *  - name: models
 *    description: Add. find, update and delete models
 * /router/models:
 *   post:
 *     tags:
 *      - models
 *     description: добавляет модель в базу данных.
 *     security:
 *       - APIkey: []
 *     requestBody:
 *       description: объект с полями имя пользователя, имя модели, тип модели, json file модели . аутентификация по API ключу.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Имя пользователя.
 *               modelname:
 *                 type: string
 *                 description: Имя модели.
 *               modeltype:
 *                 type: string 
 *                 description: Тип модели
 *               code:
 *                 type: "object"
 *                 description: JSON файл модели
 *       required: true
 *     responses:
 *       200:
 *         description: model has been added!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: model has been added!.
 *       400:
 *         description: wrong parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: Comment added.
 *       401:
 *         description: no user with such apikey.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: no user with such apikey.
 *       501:
 *         description: server could not update the model.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: server could not update the model.
 * /router/models/{id}:
 *   put:
 *     tags:
 *      - models
 *     description: обновляет модель в базе данных.
 *     security:
 *       - APIkey: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of model that needs to be updated
 *         required: true
 *         schema:
 *           type: string
 *           format:
 *     requestBody:
 *       description: объект с полями имя пользователя, имя модели, тип модели, json file модели . аутентификация по API ключу.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Имя пользователя.
 *               modelname:
 *                 type: string
 *                 description: Имя модели.
 *               modeltype:
 *                 type: string 
 *                 description: Тип модели
 *               code:
 *                 type: "object"
 *                 description: JSON файл модели
 *       required: false
 *     responses:
 *       200:
 *         description: model has been updated!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: model has been updated!
 *       400:
 *         description: wrong parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: Comment added.
 *       401:
 *         description: no user with such apikey.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: no user with such apikey.
 *       404:
 *         description: no model with such id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: no model with such id.
 *       501:
 *         description: server could not update the model.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: server could not update the model.
 * /router/delmodel/{id}:
 *   delete:
 *     tags:
 *      - models
 *     description: удаляет модель из базы данных.
 *     security:
 *       - APIkey: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of model that needs to be deleted
 *         required: true
 *         schema:
 *           type: string
 *           format:
 *     responses:
 *       200:
 *         description: model successfully deleted!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: model successfully deleted!
 *       401:
 *         description: no user with such apikey.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: no user with such apikey.
 *       404:
 *         description: no model with such id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: no model with such id.
 * /router/allmodels:
 *   get:
 *     tags:
 *      - models
 *     description: выводит все модели в базе данных.
 *     responses:
 *       200:
 *         description: all models in db
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: model id.
 *                 modelname:
 *                   type: string
 *                   description: name of found model
 * /router/model/{id}:
 *   get:
 *     tags:
 *      - models
 *     description: ищет модель в базе данных по ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of model that needs to be deleted
 *         required: true
 *         schema:
 *           type: string
 *           format:
 *     responses:
 *       200:
 *         description: found model
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: model id.
 *                 username:
 *                   type: string
 *                   description: username
 *                 modelname:
 *                   type: string
 *                   description: name of found model
 *                 modeltype:
 *                   type: string
 *                   description: type of found model
 *                 code:
 *                   type: object
 *                   description: JSON file
 *                 description:
 *                   type: string
 *                 comments:
 *                   type: string
 *                 creationdate:
 *                   type: date
 *                 lastchange:
 *                   type: date
 *       404:
 *         description: no model with such id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: no model with such id.
 * /router/api:
 *   post:
 *     tags:
 *      - APIkeys
 *     description: добавляет/ищет пользователя и возвращает его ключ.
 *     requestBody:
 *       description: имя искомого или нового пользователя.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Имя пользователя.
 *       required: true
 *     responses:
 *       200:
 *         description: found / added id
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               description: message and id.
 *       400:
 *         description: wrong parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: Comment added.
 * /router/deletekey:
 *   delete:
 *     tags:
 *      - APIkeys
 *     description: удаляет текущего пользователя.
 *     security:
 *       - APIkey: []
 *     responses:
 *       200:
 *         description: user successfully deleted!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: user successfully deleted!
 *       404:
 *         description: no user with such apikey.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       description: Status of the response.
 *                     message:
 *                       type: string
 *                       description: no user with such apikey.
 */


const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Node server with 3D-models",
        version: "1.0.0",
        description: "my shy server w 3d-models",
    },
    components: {
        securitySchemes: {
        APIkey: {
            description:
                "API ключ для авторизации, если нет, то можно воспользоваться `646e85e64cfbdbd78aa31d70`.",
            type: "apiKey",
            name: "APIkey",
            in: "query",
            },
        },
    },
    servers: [
    {
        url: "http://127.0.0.1:5500",
        description: "Локальный для разработки",
    },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./router/*.js"], // из каких файлов забираем JSDoc @swagger
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;