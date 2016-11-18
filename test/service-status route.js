'use strict';

var expect = require('expect.js'),
    plugin = require('../index.js');

describe('/health', function() {

    describe('happy path', function() {
        var payload,
            statusCode;

        before(function(done) {
            var server = {
                route: function(routes) {
                    var req = {};
                    var reply = function(value) {
                        payload = value;
                        return {
                            code: function(code) { statusCode = code; }
                        };
                    };

                    routes[0].handler(req, reply);
                }
            };

            plugin.register(server, null, done);
        });

        it('should return status code 200', function() {
            expect(statusCode).to.equal(200);
        });

        it('should return payload with overall status succeeding', function() {
            expect(payload).to.equal('☃');
        });
    });

    describe('when not healthy', function() {
        var payload,
            statusCode;

        before(function(done) {
            var server = {
                route: function(routes) {
                    var req = {};
                    var reply = function(value) {
                        payload = value;
                        return {
                            code: function(code) { statusCode = code; }
                        };
                    };

                    routes[0].handler(req, reply);
                }
            };

            plugin.register(server, {
                ready: function(cb) {
                    cb(false);
                }
            }, done);
        });

        it('should return status code 500', function() {
            expect(statusCode).to.equal(500);
        });

        it('should return payload with overall status faulting', function() {
            expect(payload).to.equal('⌛');
        });
    });

    describe('when ready handler provided and healthy', function() {
        var payload,
            statusCode;

        before(function(done) {
            var server = {
                route: function(routes) {
                    var req = {};
                    var reply = function(value) {
                        payload = value;
                        return {
                            code: function(code) { statusCode = code; }
                        };
                    };

                    routes[0].handler(req, reply);
                }
            };

            plugin.register(server, {
                ready: function(cb) {
                    cb(true);
                }
            }, done);
        });

        it('should return status code 500', function() {
            expect(statusCode).to.equal(200);
        });

        it('should return payload with overall status faulting', function() {
            expect(payload).to.equal('☃');
        });
    });
});
