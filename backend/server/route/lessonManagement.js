const express = require('express');
let router = express.Router();

const lessonCreation = require('../bll/lessonManagement/lessonCreation');
const lessonSearch = require('../bll/lessonManagement/lessonSearch');
const lessonSelect = require('../bll/lessonManagement/lessonSelection');
const lessonStatus = require('../bll/lessonManagement/lessonStatus');
/**
 * @swagger
 * /lesson/create:
 *  post:
 *    tags:
 *      - Lesson Management
 *    summary: Add a new lesson to the database
 *    description: Add a new lesson to the database and add it to the subjects document too
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: lesson
 *        description: Document format
 *        schema:
 *          $ref: '#/definitions/Lesson'
 *    responses:
 *      201:
 *        description: Lesson created
 *      409:
 *        description: Lesson already exists
 *      500:
 *        description: Database or server error
 */ 
router.post('/lesson/create', lessonCreation.lessonCreation);

/**
 * @swagger
 * /lesson/search:
 *  get:
 *    tags:
 *      - Lesson Management
 *    summary: Search for a lesson based on its name
 *    description: Attendy lesson search
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *          example: class 1
 *        description: For this app we have class 1, class 2, class 3, class 4, class 5
 *    responses:
 *      200:
 *        description: Returns found lessons 
 *      409:
 *        description: Lesson does not exist
 *      500:
 *        description: Database or server error
 */ 
router.get('/lesson/search', lessonSearch.lessonSearch);

/**
 * @swagger
 * /lesson/select:
 *    post:
 *      tags:
 *          - Lesson Management
 *      summary: User adds lesson
 *      description: Select lesson and add it to the attendance database 
 *      parameters:
 *      - in: body
 *        name: attendance
 *        description: Document format
 *        schema:
 *          $ref: '#/definitions/Attendance'
 *      responses:
 *        201:
 *          description: Successfully added lesson
 *        204:
 *          description: Conditions not fulfilled
 *        500:
 *          description: Database or server error
 * 
 */
router.post('/lesson/select', lessonSelect.lessonSelect);


/**
 * @swagger
 * /lesson/status:
 *    put:
 *      tags:
 *          - Lesson Management
 *      summary: Faculty changes lesson status
 *      description: Status is closed (lesson has not started), punctual (lesson started), late and finished (lesson ended)
 *      parameters:
 *        - name: subjectName
 *          in: query
 *          description: Subject name
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: Entrepreneurial Leadership
 *        - name: lessonName
 *          in: query
 *          description: Name of the class. Like class 1, class 2 etc.
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: class 1
 *        - name: status
 *          in: query
 *          description: Choose the following in lowercase - punctual, late, finished
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: punctual
 *      responses:
 *        201:
 *          description: Successfully updated lesson status
 *        204:
 *          description: Conditions not fulfilled
 *        500:
 *          description: Database or server error
 * 
 */
router.put('/lesson/status', lessonStatus.lessonStatus);
module.exports = router;