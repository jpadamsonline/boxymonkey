var request = require('supertest');
var app = require('../server.js');

describe('GET /', function() {
    it('responds with BoxyMonkey welcome msg', function () {
        request(app).get('/').expect('Welcome to Boxy Monkey!<br/> A work in progress.');
    });
});
