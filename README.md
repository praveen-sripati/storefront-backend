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
- To get started, clone this repo and run `npm install` in your terminal at the project root.
- In **docker-compose.yml** file, change `volumes` path as per your system.
- To connect to a database, create a docker container, use `docker compose up` command. The docker container starts the database for accepting connections.
- And use `npm run create-db` to create storefront database and `npm run delete-db` to remove storefront database.
- To start app in dev mode, use `npm start` command.
- To start app in prod mode, use `npm run build` command.
- Use `db-migrate up` to migrate db queries.
- For testing, use `npm run test` command.
- server is running on `localhost:3000`.

## License
[Udacity](LICENSE)

## Environment Variables (.env)

```javascript
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=praveen
POSTGRES_PASSWORD=postgres
ENV=dev
BCRYPT_PASSWORD=haha-my-friend
SALT_ROUNDS=10
TOKEN_SECRET=something
```
