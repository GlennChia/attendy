const express = require('express');
let router = express.Router();

const userSignup = require('../bll/userManagement/userSignup');


/**
 * @swagger
 * /signup:
 *  post:
 *    tags:
 *      - User Management
 *    summary: "Add a new user to the database"
 *    description: Attendy User Sign ups
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: User sign up 
 *        schema:
 *          $ref: '#/definitions/UserCredentialsModel'
 *    responses:
 *      200:
 *        description: "User has signed up"
 *      400:
 *        description: "Some of the fields are blank"
 *      409:
 *        description: "User already exists"
 *      500:
 *        description: "Database or server error"
 */ 
router.post('/signup', userSignup.userSignup);

module.exports = router;