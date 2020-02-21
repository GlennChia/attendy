const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* @swagger
* definitions:
*  User:
*    type: object
*    required:
*      - studentId
*      - email
*      - name
*      - password 
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
let User = new Schema({
    studentId: {type: String},
    name:{type: String},
    password: {type: String},
    email: {type: String},
    authority: {type: String},
    subjects: [{
        type: String
    }]
});


module.exports = mongoose.model('user', User);