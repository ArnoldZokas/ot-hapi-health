'use strict';

exports.register = function(plugin, options, next) {
    plugin.route([
        {
            method: 'GET',
            path: '/health',
            handler: function(req, reply) {
                return reply('☃').code(200);
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
