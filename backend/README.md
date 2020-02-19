# 1. App Creation

Create the app with `npm init`

## 1.1 Installations

| Package            | Version | Description                                                  |
| ------------------ | ------- | ------------------------------------------------------------ |
| body-parser        | ^1.19.0 | Used to process the req such that we can extract it as req.body. Used as a middleware |
| cors               | ^2.8.5  |                                                              |
| express            | ^4.17.1 |                                                              |
| mongoose           | ^5.9.1  | ORM to simplify interactions with the database               |
| nodemon            | ^2.0.2  | Detect changes and hot reload                                |
| swagger-jsdoc      | ^3.5.0  |                                                              |
| swagger-ui-express | ^4.1.3  |                                                              |

# 2. Setting up

## 2.1 Swagger set up

**<u>General Set-Up</u>**

Useful Links to set up Swagger with JSDoc

1. General set-up with sample `get` and `put` request: https://github.com/brian-childress/node-autogenerate-swagger-documentation
2. Shows how to format schemas and request bodies: https://swagger.io/docs/specification/2-0/describing-request-body/

<u>**Summarized samples**</u>

General setup and render UI- app.js

```javascript
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Glenn Chia"
      },
      servers: ["http://localhost:5000"]
    }
  },
  apis: ["app.js", "./server/route/*.js", "./server/database/models/userCredentialsModel.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
```

Get request (No parameters) - generalRoute.js

```javascript
/**
 * @swagger
 * /healthcheck:
 *  get:
 *    tags: 
 *      - Auxiliary
 *    description: Healthcheck for server status
 *    responses:
 *      '200':
 *        description: Server is healthy
 *    
 */
```

Post request - userManagement.js

```javascript
/**
 * @swagger
 * /signup:
 *  post:
 *    tags:
 *      - User Management
 *    summary: "Add a new user to the database"
 *    description: Attendy User Sign ups
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: User sign up 
 *        schema:
 *          $ref: '#/definitions/UserCredentialsModel'
 *    responses:
 *      200:
 *        description: "User has signed up"
 *      400:
 *        description: "Some of the fields are blank"
 *      409:
 *        description: "User already exists"
 *      500:
 *        description: "Database or server error"
 */ 
```

Schema Design - userCredentialsModel.js

```javascript
/**
* @swagger
* definitions:
*  UserCredentialsModel:
*    type: object
*    required:
*      - userName
*    properties:
*      name:
*        type: string
*        example: glenn
*      email:
*        type: string
*        example: glenn@gmail.com
*      password:
*        type: string
*        example: password123
*      studentId:
*        type: string
*        example: X12345
*/
```







## 2.2 MongoDB set up

I used an ORM to make queries easier to perform. I defined the model in its own models folder and then called it in the `bll` folder. I connected to the database in the app.js file.

app.js

```javascript
const mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/attendy_user';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true } );
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
```

Schema Creation

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserCredentialsModel = new Schema({
    studentId: {type: String},
    name:{type: String},
    password: {type: String},
    email: {type: String},
});


module.exports = mongoose.model('userCredentialsModel', UserCredentialsModel);
```

Sample `find` and `save` userSignup.js

```javascript
UserCredentials.find( { $or: [{'studentId' : studentId }, {'email': email}]}, function (err, docs) {
    if (!docs.length){
        user.save(function (err) {
            if (err) {
                console.log(err)
                return next(err);
            } 
            return res.status(200).send({ message: 'successful registration' });   
        });
    }else{                
        return res.status(409).send({ message: 'User Exists' }); 
    }
});
```

