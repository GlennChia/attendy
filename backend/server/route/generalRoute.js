const express = require('express');
let router = express.Router();


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

module.exports = router;