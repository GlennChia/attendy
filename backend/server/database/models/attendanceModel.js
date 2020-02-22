const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* @swagger
* definitions:
*  Attendance:
*    type: object
*    required:
*      - subjectId
*      - classId
*      - userId
*    properties:
*      subjectId:
*        type: string
*        example: 5e508c5c708f0c14dc8fe244
*      lessonId:
*        type: string
*        example: 5e50df1fe2828024f8a5dd66
*      userId:
*        type: string
*        example: X12345
*      status:
*        type: string
*        example: absent
*      timeIn:
*        type: string
*        example: ''
*/
let Attendance = new Schema({
    subjectId: {type: String},
    lessonId: {type: String},
    userId: {type: String},
    status: {type: String, default: 'absent'},
    timeIn: {type: Date, default: ''},
});


module.exports = mongoose.model('attendance', Attendance);