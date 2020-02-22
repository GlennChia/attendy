const express = require('express');
let router = express.Router();

const lessonCreation = require('../bll/lessonManagement/lessonCreation');

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




module.exports = router;