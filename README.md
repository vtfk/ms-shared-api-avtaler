[![Build Status](https://travis-ci.com/vtfk/ms-shared-api-avtaler.svg?branch=master)](https://travis-ci.com/vtfk/ms-shared-api-avtaler)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# ms-shared-api-avtaler

API for agreements.

For more information read the [description](docs/beskrivelse.md)(in Norwegian)

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
    name: '',
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
$ curl -v POST http://localhost:3000/agreements/search -d @test/data/search-no-types.json \
--header "Content-Type: application/json"
```

```
$ curl -v POST http://localhost:3000/agreements/search -d @test/data/search-type.json \
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
    name: '',
    type: '',
    partOf: '',
    status: '',
    updated: Date,
    parts: [
      {
        uid: '',
        aid: '',
        fid: '',
        name: '',
        type: '',
        partOf: '',
        status: '',
        updated: Date,
        isSigned: boolean,
        history: []
      }
    ],
    history: [],
    isSigned: boolean
    sendInvoiceToUid: 'uid'
  }  
]
```

## ```GET /agreements/:id```

Returns a given agreement.

Valid `id` are `_id` or `aid`

```
curl -v http://localhost:3000/agreements/5cfba60a47289a8314684faf
```

```JavaScript
{
    _id: '',
    uid: '',
    aid: '',
    fid: '',
    name: '',
    type: '',
    partOf: '',
    status: '',
    updated: Date,
    parts: [
      {
        uid: '',
        aid: '',
        fid: '',
        name: '',
        type: '',
        partOf: '',
        status: '',
        updated: Date,
        isSigned: boolean
      }
    ],
    history: [],
    isSigned: boolean
    sendInvoiceToUid: 'uid'
  }
```

## ```POST /agreements/:id```

Updates an agreement.

Valid `id` are `_id` or `aid`

```
$ curl -v POST http://localhost:3000/agreements/5cfba60a47289a8314684faf -d @test/data/update-agreement.json \
--header "Content-Type: application/json"
```

## ```POST /agreements/:id/sign```

Manually sign an agreement.

Valid `id` are `_id` or `aid`

```
$ curl -v POST http://localhost:3000/agreements/5cfca18f25a3a62e947d615b/sign -d @test/data/sign-agreement.json \
--header "Content-Type: application/json"
```

## ```DELETE /agreements/:id```

Deletes the given agreement.

Valid `id` are `_id` or `aid`

```
$ curl -vX DELETE http://localhost:3000/agreements/5cfba60a47289a8314684faf
```

## ```GET /agreements/parent/:fid```

Returns a parent agreement for a given fid.

```
curl -v http://localhost:3000/agreements/parent/333dec0e-158b-4b1c-9245-f6f205f3182e
```

```JavaScript
[
  {
    _id: '5cfcf4c2560368954e9aee74',
    uid: '12345678987',
    aid: '5514ec16-59bf-4009-bd5d-452c57144a17',
    fid: '9b064152-5a50-4c3b-bc97-5c8edd87c3c1',
    name: 'Gandalf Grå',
    type: 'elevpc',
    partOf: '',
    updated: Date,
    isSigned: true
  }
]
```

## ```GET /docs```

This README

# Development

You'll need the [now-cli](https://zeit.co/now) installed

- clone the repo
- install dependencies
- add a `.env` file
- start the service with now-dev ```$ now dev```

.env

```
NODE_ENV=development
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

# Deploy

This service is created to run on the [ZEIT/Now](https://zeit.co/now) serverless infrastructure.

Make sure the settings in [now.json](now.json) matches your environment.

Run the deploy script.

```
$ npm run deploy
```

# Related

- [micro-svarut](https://github.com/telemark/micro-svarut) microservice wrapper for SvarUt
- [minelev-avtaler](https://github.com/telemark/minelev-avtaler) frontend for avtaler in MinElev
- [avtale-generator](https://github.com/telemark/avtale-generator) generator for avtaler

# License

[MIT](LICENSE)