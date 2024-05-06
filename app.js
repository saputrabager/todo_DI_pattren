require(`dotenv`).config();
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.NODE_PORT || 3000;
const cors = require('cors')
const morgan = require('morgan')
const registerRoute = require('./src/auth/route');
const categoryRoute = require('./src/todo/route');
const db = require('./database/models')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(morgan(':method :url :date[web] :status :res[content-length]  - :response-time ms'));

app.use(registerRoute);
app.use(categoryRoute);

if (process.env.NODE_ENV !== "test") {
    db.sequelize.sync().then(() => {
        console.log('DB connected!')
    })
}

app.listen(port);
console.log('RESTful API server started on: ' + port);

module.exports = app