const express = require('express');
let router = express.Router();

const subjectCreation = require('../bll/subjectsManagement/subjectCreation');
const subjectSearch = require('../bll/subjectsManagement/subjectSearch');
const subjectSelect = require('../bll/subjectsManagement/subjectSelection');
/**
 * @swagger
 * /subject/create:
 *  post:
 *    tags:
 *      - Subject Management
 *    summary: Add a new subject to the database
 *    description: Attendy Subject creation
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: subject
 *        description: Document format
 *        schema:
 *          $ref: '#/definitions/Subject'
 *    responses:
 *      201:
 *        description: Subject created
 *      400:
 *        description: Missing name
 *      409:
 *        description: Subject already exists
 *      500:
 *        description: Database or server error
 */ 
router.post('/subject/create', subjectCreation.subjectCreation);

/**
 * @swagger
 * /subject/search:
 *  get:
 *    tags:
 *      - Subject Management
 *    summary: "Search for a subject based on its ID"
 *    description: Attendy subject search
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: _id
 *        schema:
 *          type: string
 *          example: 5e50214a16e61201e8f6812a
 *        description: subject ID that was generated by MongoDB
 *    responses:
 *      200:
 *        description: Returns found subjects 
 *      409:
 *        description: Subject does not exist
 *      500:
 *        description: Database or server error
 */ 
router.get('/subject/search', subjectSearch.subjectSearch);

/**
 * @swagger
 * /subject/select:
 *    put:
 *      tags:
 *          - Subject Management
 *      summary: User adds subject
 *      description: Select subject and add it to the user's array of subjects 
 *      parameters:
 *        - name: subjectId
 *          in: query
 *          description: Subject Id that is generated by MongoDB
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: 5e50214a16e61201e8f6812a
 *        - name: userId
 *          in: query
 *          description: User Id that we registered with
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *            example: X12345
 *      responses:
 *        201:
 *          description: Successfully added subject
 *        204:
 *          description: Conditions not fulfilled
 *        500:
 *          description: Database or server error
 * 
 */
router.put('/subject/select', subjectSelect.subjectSelection);


module.exports = router;