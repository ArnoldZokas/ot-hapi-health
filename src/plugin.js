'use strict';

var joi = require('joi');
var schema = require('./schema');

var success = { code: 200, response: '☃' };
var fail = { code: 500, response: '💩' };

exports.register = function(plugin, options, next) {

    var config = options || {},
        validation = joi.validate(config, schema, { allowUnknown: true });

    if(validation.error) {
        var err = new Error('config validation error');
        err.inner = validation.error;
        return next(err);
    }

    plugin.route([
        {
            method: 'GET',
            path: '/health',
            handler: function(req, reply) {

                if(!config.isHealthy) {
                    return reply(success.response).code(success.code);
                }

                config.isHealthy(function(healthy) {
                    var outcome = healthy ? success : fail;
                    reply(outcome.response).code(outcome.code);
                });
            },
            config: {
                auth: false,
                description: 'get-health',
                plugins: {
                    'ot-hapi-request-metrics': {
                        endpoint: 'get-health',
                        version: '1'
                    }
                }
            }
        }
    ]);

    next();
};
