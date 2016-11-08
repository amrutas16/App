var request = require("request")
var chai = require("chai");
var expect = chai.expect;

var request = require("request");

describe("test", function() {
  describe('GET /set', function () {
   it("should have status code 200", function(done) {
      request("http://localhost:3000/set", function(error, response, body) {
      	expect(response.statusCode).to.equal(200);
        done();
      });
    });

   it("should respond with 'Key set!'", function(done) {
      request("http://localhost:3000/set", function(error, response, body) {
        expect(body).to.equal("Key set!");
        done();
      });
   });

  });
});

