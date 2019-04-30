[![Build Status](https://travis-ci.com/vtfk/ms-shared-api-avtaler.svg?branch=master)](https://travis-ci.com/vtfk/ms-shared-api-avtaler)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# ms-shared-api-avtaler

API for agreements

# API

All API calls needs valid jwt.

## ```GET /```

This README

## ```PUT /agreements```

Adds new agreement

```JavaScript
  {
    uid: '',
    aid: '',
    fid: '',
    type: '',
    partOf: ''
  } 
```

```
$ curl -vX PUT http://localhost:3000/agreements -d @test/data/main-record.json \
--header "Content-Type: application/json"
```

## ```POST /agreements/search```

Post an array of uids to search agreements for uids.
Can filter by type (type is optional).

```JavaScript
{
  uids: [],
  type: ''
}
```

```
$ curl -vX POST http://localhost:3000/agreements/search -d @test/data/search-no-types.json \
--header "Content-Type: application/json"
```

```
$ curl -vX POST http://localhost:3000/agreements/search -d @test/data/search-type.json \
--header "Content-Type: application/json"
```

Returns array of agreements 

```JavaScript
[
  {
    _id: '',
    uid: '',
    aid: '',
    fid: '',
    type: '',
    partOf: '',
    status: '',
    updated: Date,
    parts: [
      {
        uid: '',
        aid: '',
        fid: '',
        type: '',
        partOf: '',
        status: '',
        updated: Date,
        isSigned: boolean,
        data: []
      }
    ],
    history: [],
    isSigned: boolean
    data: [],
    sendInvoiceTo: 'uid'
  }  
]
```

## ```GET /agreements/:id```

Returns a given agreement

```JavaScript
{
    _id: '',
    uid: '',
    aid: '',
    fid: '',
    type: '',
    partOf: '',
    status: '',
    updated: Date,
    parts: [
      {
        uid: '',
        aid: '',
        fid: '',
        type: '',
        partOf: '',
        status: '',
        updated: Date,
        isSigned: boolean,
        data: []
      }
    ],
    history: [],
    isSigned: boolean
    data: [],
    sendInvoiceTo: 'uid'
  }
```

## ```POST /agreements/:id```

Updates an agreement.

## ```DELETE /agreements/:id```

Deletes the given agreement.

```
$ curl -vX DELETE http://localhost:3000/agreements/5cc8141418a4bf6f7db233d4
```


## ```GET /docs```

This README

# Setup

Configure your environment

```
JWT_SECRET=your-jwt-api-secret
MONGODB_CONNECTION=connection-string-to-your-mongodb
MONGODB_COLLECTION=mongodb-collection-name
MONGODB_NAME=mongodb-database-name
SVARUT_SERVICE_URL=url-for-your-svarut-service
SVARUT_SERVICE_SECRET=jwt-secret-for-your-svarut-service
PAPERTRAIL_HOST=your-papertrail-host
PAPERTRAIL_PORT=your-papertrail-post
PAPERTRAIL_HOSTNAME=your-papertrail-hostname
```

# License

[MIT](LICENSE)