 # Sonore-events-front-end

Front-end for SonoreEvents, an application to manage sound equipments and create budgets.

## About

SonoreEvents is a web browser application with which you can manage the equipemnts by adding,
deleting and updating them. You can also create budgets and download them in docx format.

<img src="https://s12.gifyu.com/images/SWBFK.gif">

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Populate `.env` file based on `.env.example`. `VITE_API_BASE_URL` should point to your API server (sonore-events-back-end)

4. Run the back-end in a development environment:

```bash
npm run dev
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running application locally or inside docker

`.env.development` and `.env.test` must be changed if you and to run the application locally or inside docker. You can populate files based on `.env.example` file, but you need to consider the following:

- Running application locally (postgres and node):

Add your postgres credentials and make sure to create given database before running the application.

- Running application inside docker (postgres and node):

Set `POSTGRES_HOST` to `sonore-events-postgres-development` for `.env.development` and `sonore-events-postgres-test` for `.env.test` file. It is the name of the postgres container inside docker-compose file. Docker Compose will start the postgres container for you, create the database and host alias for you.

- Running application locally (node) but postgres is running inside docker:

Set `POSTGRES_HOST` to `localhost` for `.env.development` and `localhost` for `.env.test` file. Docker compose is configured to expose postgres container to your localhost.

## What to do when add new ENV VARIABLES

Please notice that every ENV that should be available on browser should start with `REACT_APP_` prefix. There are several things you need to do when you add new ENV VARIABLES:

- Add them to `.env.example` file
- Add them to your local `.env` file
- Add them to your docker-compose.yml file (just the name, not the value). Only envs listed in the environment section will be exposed to your docker container.
- Add them (prod version) to your github repo secrets. They will be used to generate the `.env` file on deploy.


# Sonore-events-back-end

Back-end for SonoreEvents, an application to manage sound equipments and create budgets.

## About

SonoreEvents is a web browser application with which you can manage the quipemnts by adding,
deleting and updating them. You can also create budgets and download them in the format docx.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env.development` file using the `.env.example` file (see "Running application locally or inside docker section" for details)
5. Run all migrations

```bash
npm run dev:migration:run
```

6. Seed db

```bash
npm run dev:seed
```

6. Run the back-end in a development environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section
1. Configure the `.env.test` file using the `.env.example` file (see "Running application locally or inside docker" section for details)
1. Run all migrations

```bash
npm run migration:run
```

3. Run test:
   (locally)

```bash
npm run test
```

(docker)

```bash
npm run test:docker
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running migrations or generate prisma clients

Before running migrations make sure you have a postgres db running based on `.env.development` or `.env.test` file for each environment. You can start a postgres instance by typing `npm run dev:postgres` or `npm run test:postgres`. The host name is the name of the postgres container inside docker-compose file if you are running the application inside a docker container or localhost if you are running it locally.

You can operate on databases for different environments, but it is necessary to populate correct env variables for each environment first, so in order to perform db operations type the following commands:

- `npm run dev:migration:run` - run migrations for development environment by loading envs from .env.development file. It uses [dotenv-cli](https://github.com/entropitor/dotenv-cli#readme) to load envs from .env.development file.
- `npm run test:migration:run` - the same, but for test environment

- `npm run dev:migration:generate -- --name ATOMIC_OPERATION_NAME` - generate and run migration and prisma client for development environment by loading envs from .env.development file. Replace `ATOMIC_OPERATION_NAME` by the name of the migration you want to generate.

## Switching between environments

In order to switch between development and test environments you need to shutdown the current postgres instance if it is running and start the new one.

If you are in development environment:

```bash
npm run dev:postgres:down
```

And then

```bash
npm run test:postgres
```

If you are in test environment:

```bash
npm run test:postgres:down
```

And then

```bash
npm run dev:postgres
```

## Running application locally or inside docker

`.env.development` and `.env.test` must be changed if you and to run the application locally or inside docker. You can populate files based on `.env.example` file, but you need to consider the following:

- Running application locally (postgres and node):

Add your postgres credentials and make sure to create given database before running the application.

- Running application inside docker (postgres and node):

Set `POSTGRES_HOST` to `sonore-events-postgres-development` for `.env.development` and `sonore-events-postgres-test` for `.env.test` file. It is the name of the postgres container inside docker-compose file. Docker Compose will start the postgres container for you, create the database and host alias for you.

- Running application locally (node) but postgres is running inside docker:

Set `POSTGRES_HOST` to `localhost` for `.env.development` and `localhost` for `.env.test` file. Docker compose is configured to expose postgres container to your localhost.

## What to do when add new ENV VARIABLES

There are several things you need to do when you add new ENV VARIABLES:
- Add them to `.env.example` file
- Add them to your local `.env.development` and `.env.test` files
- Add them to your docker-compose.yml file (just the name, not the value). Only envs listed in the environment section will be exposed to your docker container.
- Add them (prod version) to your github repo secrets. They will be used to generate the `.env` file on deploy.
- Add them (prod version) to test.yml file on .github/workflows/test.yml.

