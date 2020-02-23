const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* @swagger
* definitions:
*  Attendance:
*    type: object
*    required:
*      - subjectName
*      - lessonName
*      - userName
*      - berkeleyId
*      - userId
*    properties:
*      subjectName:
*        type: string
*        example: Entrepreneurial Leadership
*      lessonName:
*        type: string
*        example: class 1
*      userId:
*        type: string
*        example: X12345
*      status:
*        type: string
*        example: absent
*      timeIn:
*        type: string
*        example: ''
*      userName:
*        type: string
*        example: Glenn 
*      berkeleyId:
*        type: string
*        example: 1231412312312
*/
let Attendance = new Schema({
    subjectName: {type: String},
    lessonName: {type: String},
    userName: {type: String},
    berkeleyId: {type: String},
    userId: {type: String},
    status: {type: String, default: 'absent'},
    timeIn: {type: Date, default: ''},
});


module.exports = mongoose.model('attendance', Attendance);