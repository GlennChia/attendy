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

Helpful points to get to the Mongo Database -> collection -> search all data

```
mongo
use attendy
db.usercredentialsmodels.find()
```

Dropping a database

```
show databases
use <database_name>
db.dropDatabase()
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

## 2.6 Logging setup

### 2.6.1 Local logging

Link: https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications

Packages needed: `winston` and `morgan` 

Files edited: log.js and app.js

Winston logs to both the `console` and the `file` and we can customize the logger to suit our needs

IMPORTANT: We need to use The package `'app-root-path'` and in the `filename` parameter of `winston.transports.File` use `filename: ${appRoot}/log/app.log`. Using a relative path only cretes the log file if it does not exist but somehow does not write to it. This is the link the suggested that to me https://github.com/winstonjs/winston/issues/1001

# 3. System Design

## 3.1  Requirements and goals of the system

### 3.1.1 Functional requirements

1. Students should be able to record their attendance independently
2. The system must detect who is on time, late or absent
3. Students will only be able to select present
4. System must be hard to game. Whiteboard will have a pattern for users to key in
5. Dashboard to view metrics of the system for profs to view
6. Auto generation of seating plan that ensures groups take turns sitting at the front 

### 3.1.2 Non-functional requirements

1. Students must not be able to game the system. Geo-location is one aspect that we want to integrate 
2. Ability to export as a csv
3. Email notification when attendance has finished. Bonus: Include csv as an attachment
4. Scalable for multiple classes
5. Ability to view past class attendance records

## 3.2 System parameters

General parameters for a single class

1. 2 Administrators who teach a few classes (For simplicity we can stick to 1)
2. 50 users. Each user has 4 classes (For simplicity we can stick to 1)
3. 11 weeks of classes

There will not be much space constraints.

## 3.3 System APIs

For this app as of 20 Feb, we will auto assign students and admins to their classes seeing that we are designing the system for a single class. But we will take into account scalability (Features like adding classes and getting them approved, or maybe even via a name list)

| API                                             | Things to note                                               | Development stage |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------- |
| signup(name, email, studentId, password)        | Detect authority emails and set their authority as 'faculty', default is 'student'<br />For students and faculty: Then this returns the page that displays all subjects<br />Since there is only one class for the first MVP we can return the classes and subject metrics | MVP               |
| login(studentId, password)                      | For students and faculty: Then this returns the page that displays all subjects<br />Since there is only one class for the first MVP we can return the classes and subject metrics | MVP               |
| viewSubject(subjectId)                          | Displays total enrolment, enrolment (TBD), and classes.      | FINAL             |
| viewClass(classId, userId)                      | First check is status. If finished then will display whether they were punctual, late or absent. If it is closed, then they wait for it to be open. Once it is open, they get led to the page where they can fill in the seating plan. **<u>Geolocation</u>** at this point is already in play. <br />Faculty get led to a page where they can start classes. They can also see statistics when they refresh the app. This page also shows the seating plan. For classes that are finished, they can see the metrics | MVP               |
| activateClass(classId, userId)                  | Only faculty can access, we update the lateTime, status, activatedBy, endTime. <br />May not be needed if we do fix timings that are assigned to each class | MVP               |
| endClass(classId, userId)                       | Only faculty can access, we update the status to finished.<br />May not be needed if we do fix timings that are assigned to each class | MVP               |
| formatCsv(classId, userId)                      | Finds which class to format and then ensures that the person has the proper authority | MVP               |
| submitSeatingPlan(classId, userId, seatingPlan) | Upon submission, they will get an attendance confirmed.      | MVP               |

Other ideas: addClass, deleteClass, addSubject, deleteSubject

## 3.4 Database Design

Since we may want it to be scalable to classes in the future we can use a NoSQL database like MongoDB

### 3.4.1 User table (Students and Professors)

For this app we store the subject ID together with students table to save a database join

| PK   | userID: string    | Auto generated by MongoDB                                    |
| ---- | ----------------- | ------------------------------------------------------------ |
|      | name: string      |                                                              |
|      | studentId: string |                                                              |
|      | email: string     |                                                              |
|      | password: string  | To be hashed with bcryptjs                                   |
|      | authority: string | faculty or student                                           |
|      | subjects: Array   | List of all enrolled subjects (For this app element size is 1) |

### 3.4.2 User sessions table

| PK   | sessionID: string   | Auto generated by MongoDB |
| ---- | ------------------- | ------------------------- |
|      | userID: string      |                           |
|      | loginTime: datetime |                           |

### 3.4.3 Subjects table

| PK   | subjectID: string | Auto generated by MongoDB |
| ---- | ----------------- | ------------------------- |
|      | enrolment: Array  | Array of student IDs      |
|      | classes: Array    | Array of classIDs         |

### 3.4.4 Class table

Version 1: Faculty activated

| PK   | classID: string     | Auto generated by MongoDB                                    |
| ---- | ------------------- | ------------------------------------------------------------ |
|      | enrolment: Array    | Array of student IDs                                         |
|      | classes: Array      | Array of classIDs                                            |
|      | status: string      | closed, opened, finished                                     |
|      | activatedTime: Date |                                                              |
|      | lateTime: Date      | 10min after the class is activated                           |
|      | endTime: Date       | 3 hours after the class is activated                         |
|      | enrolment: Array    | Some subjects have many classes with different enrolment     |
|      | seatingPlan: Object | For students to verify what is shown on the board to indicate attendance |
|      | location: Array     | Contains latitude and longitude                              |
|      | activatedBy: String | userId (Lookup to get the name). May consider changing to just name later |
|      | finsihedBy: string  | userId (Lookup to get the name). May consider changing to just name later |

Version 2: Time based

- This schema requires a conditional check to get the status of the class. Closed, opened or finished 

| PK   | classID: string     | Auto generated by MongoDB                                    |
| ---- | ------------------- | ------------------------------------------------------------ |
|      | enrolment: Array    | Array of student IDs                                         |
|      | classes: Array      | Array of classIDs                                            |
|      | startTime: Date     | Since we already know when classes should start              |
|      | lateTime: Date      | 10min after the class has started                            |
|      | endTime: Date       | 3 hours after the class has started                          |
|      | enrolment: Array    | Some subjects have many classes with different enrolment     |
|      | seatingPlan: Object | For students to verify what is shown on the board to indicate attendance |
|      | location: Array     | Contains latitude and longitude                              |


### 3.4.5 Attendance table

Note: Absent is populated at the end of the class when status is finished. StudentId, name  

| PK   | classId and userId |                                                              |
| ---- | ------------------ | ------------------------------------------------------------ |
|      | status             | punctual, late, absent. Default: Absent. Changed only when the user makes changes. Time based |
|      | timeIn             | In case we need to do manual verification                    |

# 4. User management

## 4.1 Signup

Use bcrypt to hash the password

Create a jwt token upon signing up. Token created based on id.