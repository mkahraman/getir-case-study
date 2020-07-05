
const express = require('express');
const cors = require('cors');
const db = require('./models/index');
const routerController = require('./controller/routers');

const app = express();
app.use(express.json());

db.connect();
app.use(express.json()); // JSON parser
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cors());

app.use('/', routerController);

app.use((req, res, next) => {
    res.status(404).json({
    code: 44,
    msg: 'Incorrect operation'
  });
});

const server = app.listen(process.env.PORT || 3000, () => console.log(`Server listening port: ${process.env.PORT || 3000}`));

module.exports = app;
module.exports.server = server;
