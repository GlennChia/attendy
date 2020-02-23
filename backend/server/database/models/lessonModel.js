const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* @swagger
* definitions:
*  Lesson:
*    type: object
*    required:
*      - name
*      - subjectName
*      - classDate
*      - status
*    properties:
*      name:
*        type: string
*        example: class 1
*      subjectName:
*        type: string
*        example: 'Entrepreneurial Leadership'
*      classDate:
*        type: string
*        example: 28 Feb 2020
*      status:
*        type: string
*        example: closed
*/
let Lesson = new Schema({
    name: {type: String},
    subjectName: {type: String},
    classDate: {type: String},
    status: {type: String},
});


module.exports = mongoose.model('lesson', Lesson);