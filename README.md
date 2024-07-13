# Redis Node.js Example

This project demonstrates how to use Redis with Node.js in a production-ready setup.

## Prerequisites

- Node.js (v14 or later)
- Redis server

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` to `.env` and update the Redis URL if necessary
4. Start your Redis server
5. Run `node app.js` to execute the example

## Features

- String operations
- Hash operations
- List operations
- Set operations
- Sorted Set operations
- Key expiration
- Error handling
- Logging

## Structure

- `config/`: Configuration files
- `services/`: Service layer for Redis operations
- `utils/`: Utility functions (like logging)
- `app.js`: Main application file

## License

MIT