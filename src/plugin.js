'use strict';

var joi = require('joi');
var schema = require('./schema');

exports.register = function(plugin, options, next) {

    var config = options || {},
        validation = joi.validate(config, schema, { allowUnknown: true });

    if(validation.error){
        var err = new Error("config validation error");
        err.inner = validation.error;
        return next(err);
    }

    plugin.route([
        {
            method: 'GET',
            path: '/health',
            handler: function(req, reply) {

                var success = { code: 200, response: '☃' },
                    fail = { code: 500, response: '⌛' };

                if(!config.validate){
                    return reply(success.response).code(success.code);
                }

                config.validate(function(valid){
                    var outcome = valid ? success : fail;
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
