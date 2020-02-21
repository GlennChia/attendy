const express = require('express');
let router = express.Router();

const userSignup = require('../bll/userManagement/userSignup');
const userLogin = require('../bll/userManagement/userLogin');

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
 *          $ref: '#/definitions/User'
 *    responses:
 *      200:
 *        description: User details with token
 *      400:
 *        description: "Some of the fields are blank"
 *      409:
 *        description: "User already exists"
 *      500:
 *        description: "Database or server error"
 */ 
router.post('/signup', userSignup.userSignup);

/**
 * @swagger
 * /login:
 *  get:
 *    tags:
 *      - User Management
 *    summary: "Login for an existing user"
 *    description: Attendy User Logins
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
 *      - in: query  
 *        name: password
 *        schema:
 *          type: string
 *          example: password123
 *        description: Password that was used to sign up
 *    responses:
 *      200:
 *        description: User details with token
 *      400:
 *        description: "Some of the fields are blank"
 *      403:
 *        description: Wrong password
 *      409:
 *        description: "User does not exist"
 *      500:
 *        description: "Database or server error"
 */ 
router.get('/login', userLogin.userLogin);


module.exports = router;