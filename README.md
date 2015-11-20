# ot-hapi-health
> Health plugin for Hapi

[![Build Status](https://semaphoreci.com/api/v1/projects/108544aa-8e03-41b1-83d9-b70289833db4/501053/badge.svg)](https://semaphoreci.com/ArnoldZokas/ot-hapi-health)[![Dependency Status](https://david-dm.org/ArnoldZokas/ot-hapi-health.svg)](https://david-dm.org/ArnoldZokas/ot-hapi-health) [![NPM version](https://badge.fury.io/js/ot-hapi-health.svg)](http://badge.fury.io/js/ot-hapi-health)

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
```
$ npm i ot-hapi-health --save
```

```
var server = new (require('hapi').Server)();
server.connection({ port: 3000 });

server.register([
    require('ot-hapi-health')
], function(err) {
    if (err) {
        console.error('Failed to load plugin:', err);
    }

    server.start();
});
```

## Release History
- **v1.0.0** (2015-08-03)
    - initial release
