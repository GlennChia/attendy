const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

/**
* @swagger
* definitions:
*  User:
*    type: object
*    required:
*      - userId
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
*      userId:
*        type: string
*        example: X12345
*/
let User = new Schema({
    userId: {type: String},
    name:{type: String},
    password: {type: String},
    email: {type: String},
    authority: {type: String},
    subjects: [{
        type: String
    }]
});

User.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
User.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', User);