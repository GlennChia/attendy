const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* @swagger
* definitions:
*  Lesson:
*    type: object
*    required:
*      - name
*      - subjectId
*      - classDate
*      - startTime
*      - lateTime
*      - endTime
*      - seatingPlan
*      - location 
*    properties:
*      name:
*        type: string
*        example: class 1
*      subjectId:
*        type: string
*        example: 123213
*      classDate:
*        type: string
*        example: 28 Feb 2020
*      startTime:
*        type: Number
*        example: 1582320600000
*      lateTime:
*        type: Number
*        example: 1582321200000
*      endTime:
*        type: Number
*        example: 1582331400000
*      seatingPlan:
*        type: Array
*        example: [1,4,2,5,6,8,7,3]
*      location:
*        type: Array
*        example: [37.7913, 122.3937]
*/
let Lesson = new Schema({
    name: {type: String},
    subjectId: {type: String},
    classDate: {type: String},
    startTime: {type: Number},
    lateTime: {type: Number},
    endTime: {type: Number},
    seatingPlan: [{
        type: Number
    }],
    location: [{
        type: Number
    }],
});


module.exports = mongoose.model('lesson', Lesson);