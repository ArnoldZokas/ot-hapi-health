'use strict';

var expect = require('expect.js'),
    plugin = require('../index.js');

describe('plugin registration', function() {
    var registeredRoutes;

    before(function(done) {
        var server = {
            route: function(routes) {
                registeredRoutes = routes;
            }
        };

        plugin.register(server, { monitors: [] }, done);
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
