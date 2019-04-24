# ms-shared-api-avtaler

API for agreements

# API

All API calls needs valid jwt

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

## ```POST /agreements````

Post an array of uids to get agreements.
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

## ```GET /agreements/:id````

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

Updates an agreement

## ```DELETE /agreements/:id```

Deletes an agreement

## ```PUT /agreements/:id/parts```

Adds a part to an agreement

## ```POST /agreements/:id/parts/:partid```

Updates a part of an agreement

## ```DELETE /agreements/:id/parts/:partid```

Deletes an agreement part

## ```GET /docs```

This README

# License

[MIT](LICENSE)