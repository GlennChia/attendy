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
*        example: []
*        description: List of class Ids that will be appended to the array
*/
let Subject = new Schema({
    name:{type: String},
    // Classes are not that critical to be tracked here because later we sort by subject and class
    classes: { type: Array, default: []}
});


module.exports = mongoose.model('subject', Subject);