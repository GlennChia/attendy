var expect  = require('chai').expect;
var request = require('request');

const server = require('../app');

console.log(server)
it('healthcheck', function(done) {
    request('http://localhost:8080/healthcheck' , function(error, response, body) {
        expect(body).to.equal('Server is healthy');
        done();
    });
});