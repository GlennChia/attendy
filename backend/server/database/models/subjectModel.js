const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* @swagger
* definitions:
*  Subject:
*    type: object
*    required:
*      - name
*    properties:
*      name:
*        type: string
*        example: Entrepreneurial Leadership
*        description: Name of the subject
*      classes:
*        type: array
*        items:
*          type: string
*        example: ['class 1', 'class 2', 'class 3', 'class 4', 'class 5']
*        description: List of class names
*/
let Subject = new Schema({
    name:{type: String},
    classes: { type: Array, default: []}
});


module.exports = mongoose.model('subject', Subject);