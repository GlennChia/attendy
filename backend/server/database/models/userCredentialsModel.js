const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
let UserCredentialsModel = new Schema({
    studentId: {type: String},
    name:{type: String},
    password: {type: String},
    email: {type: String},
});


module.exports = mongoose.model('userCredentialsModel', UserCredentialsModel);