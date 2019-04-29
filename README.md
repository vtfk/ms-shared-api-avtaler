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
    type: '',
    uid: '',
    aid: '',
    parts: [
      {
        uid: '',
        aid: '',
        status: '',
        updated: Date,
        isSigned: boolean
      }
    ]
  } 
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

Returns array of agreements 

```JavaScript
[
  {
    _id: '',
    type: '',
    uid: '',
    aid: '',
    parts: [
      {
        uid: '',
        aid: '',
        status: '',
        updated: Date,
        isSigned: boolean
      }
    ],
    history: [],
    isSigned: boolean
    data: []
  }  
]
```

## ```GET /agreements/:id```

Returns a given agreement

```JavaScript
{
  _id: '',
  type: '',
  uid: '',
  aid: '',
  parts: [
    {
      uid: '',
      aid: '',
      status: '',
      updated: Date,
      isSigned: boolean
    }
  ],
  history: [],
  isSigned: boolean
  data: []
}
```

## ```POST /agreements/:id```

Updates an agreement.

## ```DELETE /agreements/:id```

Deletes the given agreement.

## ```PUT /agreements/:id/parts```

Adds a new part to an agreement.

## ```POST /agreements/:id/parts/:partid```

Updates a part of an agreement.

## ```DELETE /agreements/:id/parts/:partid```

Deletes an agreement part.

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