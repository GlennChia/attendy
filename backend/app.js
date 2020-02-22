require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var morgan = require('morgan');
var winston = require('./common/util/log');
app.use(morgan('combined', { stream: winston.stream }));

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const generalRoute = require('./server/route/generalRoute');
const userManagementRoute = require('./server/route/userManagement');
const subjectManagementRoute = require('./server/route/subjectManagement');

const allConfig = require('./config');
const config = allConfig[process.env.environment];

const port = process.env.PORT || 8080;

var mongoDB = config.mongoURL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true } );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Attendy API',
      description: "Attendy API Documentation built with ExpressJS",
      version: '1.0.0',
      contact: {
        name: 'Glenn Chia',
        email: 'glenn_chia@mymail.sutd.edu.sg'
      },
      servers: [config.server]
    }
  },
  apis: ['app.js', './server/route/*.js', './server/database/models/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', generalRoute, userManagementRoute, subjectManagementRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});