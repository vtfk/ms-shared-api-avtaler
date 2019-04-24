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
    parts: []
  } 
```

## ```POST /agreements````

Post an array of uids to get agreements.
Can filter by type.

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
    parts: [],
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

## ```GET /docs```

This README

# License

[MIT](LICENSE)