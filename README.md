# Who Cares?

> Put in a subject, see if others care about it. For further details, see: [PRESS-RELEASE.md](PRESS-RELEASE.md).

## Team

  - __Product Owner__: Rory Sametz
  - __Scrum Master__: Ambroise Piganeau
  - __Development Team Members__: Ambroise Piganeau, Haley Bash, Joy Johnson, Rory Sametz

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Technologies Used](#technologies-used)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Contributing](#contributing)

## Usage

> [Insert Gulp details here]

## Technologies Used

- Backbone
- Express
- Mongodb
- D3 / Datamaps

## Requirements

- Node 0.10.x
- Bower 1.6.x

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

For convenience with running the server:
```sh
npm install nodemon
```

### Testing

To run tests:
```sh
mocha test/serverSpec.js
```

### Running Locally

On one tab:
```sh
node server/server.js
```

On separate tab:
```sh
mongod
```

### Roadmap

View the project roadmap [here](ROADMAP.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
