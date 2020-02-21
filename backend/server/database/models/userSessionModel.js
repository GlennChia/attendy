const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* @swagger
* definitions:
*  UserSession:
*    type: object
*    required:
*      - userId
*    properties:
*      loginTime:
*        type: date-time
*        example: 2017-07-21T17:32:28Z
*      userId:
*        type: string
*        example: X12345
*      token:
*        type: string
*        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJYMTIzS05LTTQ1IiwiaWF0IjoxNTgyMjczMDEzLCJleHAiOjE1ODIzNTk0MTN9.Ox-SWX4Tj3b0XnD3lo_PCUHpsPRK31403iOK8Yt_In8
*/
let UserSession = new Schema({
    userId: {type: String},
    loginTime: {type: String, default: Date.now()},
    token: {type: String}
});


module.exports = mongoose.model('userSession', UserSession);