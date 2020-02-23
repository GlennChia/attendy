const express = require('express');
let router = express.Router();

const attendanceAggregate = require('../bll/attendanceManagement/attendanceAggregate');
const attendanceSubmission = require('../bll/attendanceManagement/attendanceSubmission');
const attendanceStatus = require('../bll/attendanceManagement/attendanceStatus');
/**
 * @swagger
 * /attendance/submission:
 *  post:
 *    tags:
 *      - Attendance Management
 *    summary: Record attendance as either late or punctual
 *    description: Based on the status of the lesson as determined by the faculty
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: attendance submission body
 *        description: Document format
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *            - lessonName
 *            - subjectName
 *          properties:
 *            userName: 
 *              type: string
 *              example: glenn
 *              description: userName that the OCR recognizes
 *            berkeleyId:
 *              type: string
 *              example: 3123124124312321
 *              description: Long Id that is recognized by the OCR
 *            subjectName:
 *              type: string
 *              example: Entrepreneurial Leadership
 *              description: lessonId that was created by MongoDB
 *            lessonName:
 *              type: string
 *              example: class 1
 *    responses:
 *      200:
 *        description: attendance status updated
 *      409:
 *        description: Ids don't exist or invalid ID
 *      500:
 *        description: Database or server error
 */ 
router.post('/attendance/submission', attendanceSubmission.attendanceSubmission);

/**
 * @swagger
 * /attendance/status:
 *  get:
 *    tags:
 *      - Attendance Management
 *    summary: Check if attendance can be filled or check past records of attendance
 *    description: Check if attendance can be filled or check past records of attendance based on lessonId. Time is used to gauge status
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: lessonName
 *        schema:
 *          type: string
 *          example: class 1
 *        description: Names of the class that I gave
 *      - in: query
 *        name: userId
 *        schema:
 *          type: string
 *          example: X12345
 *        description: userID that was used to sign up for the app
 *      - in: query
 *        name: subjectName
 *        schema:
 *          type: string
 *          example: Entrepreneurial Leadership
 *        description: Name of the course
 *          
 *    responses:
 *      200:
 *        description: Returns lesson status and attendance if applicable
 *      409:
 *        description: Lesson does not exist
 *      500:
 *        description: Database or server error
 */ 
router.get('/attendance/status', attendanceStatus.attendanceStatus);

/**
 * @swagger
 * /attendance/aggregate:
 *  get:
 *    tags:
 *      - Attendance Management
 *    summary: Look up the database and get the status of student's status
 *    description: Aggregate attendance into punctual, late or absent
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: lessonName
 *        schema:
 *          type: string
 *          example: class 1
 *        description: class 1, class 2, class 3, class 4, class 5
 *    responses:
 *      200:
 *        description: Returns total, punctual, late and absent numbers
 *      409:
 *        description: Lesson does not exist
 *      500:
 *        description: Database or server error
 */
router.get('/attendance/aggregate', attendanceAggregate.attendanceAggregate);


module.exports = router;