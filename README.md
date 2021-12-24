# Storefront Backend Project

## Getting Started

This repo contains a Node and Express app consisting of a Storefront Backend API. 

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
## Installation
- To get started, clone this repo and run `npm` in your terminal at the project root.
- In **docker-compose.yml** file, change `volumes` path as per your system,
- To connect to a database, create a docker container, use `docker compose up` command. The docker container starts the database for accepting connections.
- To start app in dev mode, use `npm start` command.
- To start app in prod mode, use `npm run build` command.
- For testing, use `npm run test` command.
- server is running on `localhost:3000`.

## License
[Udacity](LICENSE)