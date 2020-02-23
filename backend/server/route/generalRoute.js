const express = require('express');
let router = express.Router();

const userFunctions = require('../bll/userManagement/userAuxiliary');
const lessonFunctions = require('../bll/lessonManagement/lessonBulkCreation');
/**
 * @swagger
 * /healthcheck:
 *  get:
 *    tags: 
 *      - Auxiliary
 *    description: Healthcheck for server status
 *    responses:
 *      '200':
 *        description: Server is healthy
 *    
 */
router.get('/healthcheck', (req, res) => {
  res.status(200).send('Server is healthy');
});


/**
 * @swagger
 * /user/search:
 *  get:
 *    tags:
 *      - Auxiliary
 *    summary: Search for user details
 *    description: Search for specific users based on their userID. Defaults to find all users
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userId
 *        schema:
 *          type: string
 *          example: X12345
 *        description: userId that was used to create account
 *    responses:
 *      200:
 *        description: Returns found users
 *      409:
 *        description: User does not exist
 *      500:
 *        description: Database or server error
 */ 
router.get('/user/search', userFunctions.userSearchAuxiliary);

/**
 * @swagger
 * /user/delete:
 *  delete:
 *    tags:
 *      - Auxiliary
 *    summary: Delete a user based on the userId
 *    description: Delete a single user based on the userId that the student signed up with
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: userId
 *        schema:
 *          type: string
 *          example: X123456
 *        description: userId that was used to create account
 *    responses:
 *      200:
 *        description: Returns found users
 *      409:
 *        description: User does not exist
 *      500:
 *        description: Database or server error
 */ 
router.delete('/user/delete', userFunctions.userDeleteAuxiliary);

/**
 * @swagger
 * /lesson/bulk:
 *  post:
 *    tags:
 *      - Auxiliary
 *    summary: Bulk insertion of lessons
 *    description: Bulk insertion of fixed lessons based on the constants file. Assumes that subjects already have the lessons
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Bulk lesson submission body
 *        description: Array of lessons that are formatted
 *        schema:
 *          type: object
 *          required:
 *            - lessons
 *          properties:
 *            lessons: 
 *              type: array
 *              description: Array of lessons that are formatted
 *              items:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                  subjectName:
 *                    type: string
 *                  classDate:
 *                    type: string
 *                  status:
 *                    type: Number
 *              example:
 *                - name: class 1
 *                  subjectName: Entrepreneurial Leadership
 *                  classDate: 28 Feb 2020
 *                  status: closed
 *                - name: class 2
 *                  subjectName: Entrepreneurial Leadership
 *                  classDate: 6 March 2020
 *                  status: closed
 *                - name: class 3
 *                  subjectName: Entrepreneurial Leadership
 *                  classDate: 13 March 2020
 *                  status: closed
 *                - name: class 4
 *                  subjectName: Entrepreneurial Leadership
 *                  classDate: 3 April 2020
 *                  status: closed
 *                - name: class 5
 *                  subjectName: Entrepreneurial Leadership
 *                  classDate: 10 April 2020
 *                  status: closed
 *    responses:
 *      200:
 *        description: attendance status updated
 *      409:
 *        description: Ids don;t exist or invalid ID
 *      500:
 *        description: Database or server error
 */ 
router.post('/lesson/bulk', lessonFunctions.lessonBulkCreation);

module.exports = router;