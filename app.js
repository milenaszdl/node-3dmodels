const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const host = "127.0.0.1";
const port = 5500;

const restApi = require('./router/rest');

const app = express();

const logger = morgan('combined'); // логирование с использованием морган
app.use(logger);

app.disable('x-powered-by'); //используем helmet для отключения заголовока x powered by и защитить express-приложение от атак
app.use(helmet());

app.use(express.static('public'));

app.use('/router', restApi);

app.use((req,res) => {
    res.status(400);
    res.json({
        status:"Error",
        message: "Bad request"
    })
})

app.listen(port, host, () => {
    console.log(`Server is on. http://${host}:${port}`);
})