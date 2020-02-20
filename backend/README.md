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
| dotenv             | ^8.2.0  | To able reads from a .env file                               |

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







## 2.2 MongoDB set up (Locally)

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

## 2.3 Docker setup

Link for the `Dockerfile` and `docker-compose.yml`: https://itnext.io/dockerize-a-node-js-app-connected-to-mongodb-64fdeca94797

- Note: I had to change the port of the app to use `8080` and then change the `docker-compose.yml` file back to `8080:8080` for it to work

Subsequently I could access Docker from either the localhost or the machine IP

- http://localhost:8080/healthcheck (Doesn't work all the time strangely)
- http://192.168.99.100:8080/healthcheck

Shortcut to enter file: `~/Desktop/github_files/attendy/backend` to run docker commands

<u>**Understanding port forwarding**</u> 

`-p 8080:80`: Map TCP port 80 in the container to port 8080 on the Docker host.

### 2.3.1 Useful Docker commands

<u>**Compose commands**</u>

- `docker-compose build`
- `docker-compose up`
- `docker-compose down`

<u>**Other commands**</u>

`docker ps`: Lists all the running containers and their ports

![](assets/001_docker_ps.PNG)

`docker image ls`: Lists all docker images

![](assets/002_docker_image_ls.PNG)

`docker-machine ls`: If you ever need the machine IP

![](assets/003_docker_machine_ls.PNG)

## 2.4 Heroku setup

Setting up the Procfile

```
web: node app.js
```

Check if the heroku app works locally

```
heroku local web
```

First login

```
heroku login
```

Then we set the current directory as a heroku directory

```
heroku git:remote -a attendy-geofi
```

Since we are deploying a sub-folder. Sub-folder is called `backend` 

```
git subtree push --prefix backend heroku master
```

Note: For the app to work, we have to use `process.env.PORT` as Heroku assigns its own port. Link: https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of

## 2.5 MongoDB setup (Atlas)

We have to allow IP from anywhere since Heroku's app IP changes. Useful link: https://www.freecodecamp.org/forum/t/setting-up-a-whitelist-in-mongo-db-atlas/236842 

- Security -> Network Access -> Add Whitelist Entry -> Allow Access From Anywhere
  ![](assets/004_mongo_whitelist.PNG)

Specifying the database in the url. Link: https://mongoosejs.com/docs/connections.html

```
mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});
```

