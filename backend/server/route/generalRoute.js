const express = require('express');
let router = express.Router();

const userSearch = require('../bll/userManagement/userAuxiliary');

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
router.get('/user/search', userSearch.userSearchAuxiliary);

module.exports = router;