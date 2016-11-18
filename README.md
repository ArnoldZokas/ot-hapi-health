# ot-hapi-health
> Health plugin for Hapi

[![Build Status](https://secure.travis-ci.org/ArnoldZokas/ot-hapi-health.png?branch=master)](http://travis-ci.org/ArnoldZokas/ot-hapi-health) [![Dependency Status](https://david-dm.org/ArnoldZokas/ot-hapi-health.svg)](https://david-dm.org/ArnoldZokas/ot-hapi-health) [![NPM version](https://badge.fury.io/js/ot-hapi-health.svg)](http://badge.fury.io/js/ot-hapi-health)

[![NPM](https://nodei.co/npm/ot-hapi-health.png?downloads=true&stars=true)](https://nodei.co/npm/ot-hapi-health)

## Overview
Defines `/health` endpoint:
```
GET /health
Host: yourhost.com

HTTP/1.1 200 OK
content-type: text/html; charset=utf-8
cache-control: no-cache

☃
```

## Usage
```sh
$ npm i ot-hapi-health --save
```

```js
var server = new (require('hapi').Server)();
server.connection({ port: 3000 });

server.register({
    plugin: require('ot-hapi-health'),
    options: {
    	isHealthy: cb => cb(true) // optional async validator to establish app readiness
	}
}, function(err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

    server.start();
});
```

## Release History
- **v1.0.1** (2016-11-18)
    - added optional `isHealthy` validator to establish app readiness
- **v1.0.0** (2015-08-03)
    - initial release
