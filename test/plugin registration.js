'use strict';

var expect = require('expect.js'),
    plugin = require('../index.js');

describe('plugin registration', function() {

    describe('happy path', function() {
        var registeredRoutes;

        before(function(done) {
            var server = {
                route: function(routes) {
                    registeredRoutes = routes;
                }
            };

            plugin.register(server, {}, done);
        });

        it('should define "health" route', function() {
            expect(registeredRoutes.length).to.equal(1);
        });

        it('should set method of "health" route to GET', function() {
            expect(registeredRoutes[0].method).to.equal('GET');
        });

        it('should set method of "health" route to /service-status', function() {
            expect(registeredRoutes[0].path).to.equal('/health');
        });

        it('should set handler of "health" route', function() {
            expect(registeredRoutes[0].handler).to.not.equal(null);
        });

        it('should set auth setting of "health" route to false', function() {
            expect(registeredRoutes[0].config.auth).to.equal(false);
        });

        it('should set description setting of "health" route to service-status', function() {
            expect(registeredRoutes[0].config.description).to.equal('get-health');
        });
    });

    describe('when registering with ready handler', function() {

        describe('when handler is not a valid function', function() {

            var error;

            before(function(done) {
                var server = {
                    route: function() {}
                };

                plugin.register(server, {
                    isHealthy: 'not a function'
                }, function(err) {
                    error = err;
                    done();
                });
            });

            it('should throw an error', function() {
                expect(error.message).to.equal('config validation error');
                expect(error.inner.message).to.contain('"isHealthy" must be a Function');
            });
        });
    });
});
