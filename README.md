# Challenge

#### Application Setup

In order to proceed with the setup, you must have installed on your host machine the following requirements:

[Docker](https://runnable.com/docker/)  
[Docker Compose](https://docs.docker.com/compose/install/)  
[Node JS](https://nodejs.org/en/download/)  

#### Run on your local project folder:

`npm install`

#### Starting your Project

Create a `.env` file on your root folder with the following names:

```
FRETE_RAPIDO_TOKEN=
FRETE_RAPIDO_URL=
MONGODB_URI=
```

If you need the values, ask me :)

In your project root folder, just run:

`docker-compose up`

### And you're ready to go!

## Routes

Here are the main routes from this project:

### POST /api/dados

This route allows you to send shipping data for processing.

Example request body:

```json
{
  "recipient": {
    "address": {
      "zipcode": "37701306"
    }
  },
  "volumes": [
    {
      "category": "7",
      "amount": 1,
      "unitary_weight": 5,
      "unitary_price": 349,
      "sku": "example-1",
      "height": 0.2,
      "width": 0.2,
      "length": 0.2
    },
    {
      "category": "7",
      "amount": 2,
      "unitary_weight": 4,
      "unitary_price": 556,
      "sku": "example-2",
      "height": 0.4,
      "width": 0.6,
      "length": 0.15
    }
  ]
}

```

### GET /api/metrics?last_quotes={?}

This route allows you to consult the returns recorded in the database.

Parameters:

last_quotes (optional): The number of results you want returned.

Example answer:

```json
[
  {
    "count": 8,
    "totalPrice": 1383.4,
    "minPrice": 98.23,
    "maxPrice": 202.88,
    "name": "EXAMPLE 1",
    "avgPrice": 172.925
  },
  {
    "count": 8,
    "totalPrice": 485.92,
    "minPrice": 60.74,
    "maxPrice": 60.74,
    "name": "EXAMPLE 2",
    "avgPrice": 60.74
  }
]

```