# Who Cares?
---------------------------------

> Who Cares is a web-app designed to give an unbiased world view of current issues and relief efforts.

> Click on a country and see what's making headlines and how you can help!

> For further details, see: [PRESS-RELEASE.md](PRESS-RELEASE.md).

## Team

  - __Product Owner__: Lorenzo De Nobili
  - __Scrum Master__: Laura Gelston
  - __Development Team Members__: Jessica O'Brien, Abel Wang

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Technologies Used](#technologies-used)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)

## Usage

Visit the page, currently hosted on [arrogantstarfish.herokuapp.com](http://arrogantstarfish.herokuapp.com/)

## Technologies Used

- [Backbone](http://backbonejs.org)
- [Node](https://nodejs.org/)
- [Express](http://expressjs.com/)
- [Mongodb](https://www.mongodb.org)
- [Mongoose](http://mongoosejs.com) 
- [D3](http://d3js.org)
- [Datamaps](http://datamaps.github.io/)
- [Heroku Deployment](https://www.heroku.com/)

## Requirements

- [Node 0.10.x](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.org/downloads)

## Development Process

### Step 0: Fork and clone the repository from GitHub

### Step 1: Installing Dependencies

Run the following in the command line, from within the repository:

```sh
sudo npm install -g bower
npm install
```

[optional] For convenience with running the server:
```sh
npm install nodemon
```

### Step 2: Running Locally

Run the mongo database from the command line, in one tab:
```sh
mongod
```

Run the server in the other tab using node:

```sh
node server/server.js
```

[optional] run the server in nodemon instead (if installed) to automatically restart the server after changing files:

```sh
nodemon
```

### Visiting the server

While node is running, visit the locally running server at [127.0.0.1:3000](127.0.0.1:3000)

### Testing

To run tests:
```sh
grunt test
```

### Checking Syntax with JSHint

```sh
grunt syntaxTest
```

## Roadmap

View the project roadmap [here](ROADMAP.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
