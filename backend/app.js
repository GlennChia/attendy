const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const generalRoute = require('./server/route/generalRoute');
const userManagementRoute = require('./server/route/userManagement');

const port = process.env.PORT || 5000;

var mongoDB = 'mongodb://127.0.0.1/attendy_user';
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
      servers: ['http://localhost:5000']
    }
  },
  apis: ['app.js', './server/route/*.js', './server/database/models/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', generalRoute, userManagementRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});