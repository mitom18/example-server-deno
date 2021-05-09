# Example Deno server

Implementation of example backend application written in TypeScript powered by Drash running on Deno.

## Features

 - Database connection (MySQL)
 - ORM
 - HTTP REST API
 - Logger
 - Authentication

## Usage

Application requires MySQL database. Ensure you have access to a MySQL database server. You can initialize the database with `db_init.sql` script. Database contains user with credentials `admin@admin.com` / `password`.

To run this application, you'll need [Deno](https://deno.land/#installation) installed on your computer. Project is currently working with Deno in version 1.9.2.

It is recommended to use [Velociraptor](https://deno.land/x/velociraptor@1.0.0-beta.18#install) for running all scripts in the project. If you have Velociraptor installed on your computer, just run:

```
# Run the app in development
vr start

# Build the production bundle
vr bundle

# Bundles the bcrypt worker file, so it can be used in app bundle
vr bundle-bcrypt-worker

# Run the production bundle
vr start-bundle

# Compile the production bundle to executable binary
vr compile-bundle
```
If you don't have Velociraptor installed, see `scripts.yml` for commands you need to run.

> **_IMPORTANT:_** `deno bundle` has currently problems with used Zod library, so you need to review the bundle before running or compiling it and replace every usage of `mod11` to `mod10`.

> **_IMPORTANT:_** `deno bundle` is currently not able to bundle the bcrypt worker file, so you have to do it manually and then find worker.ts imports and replace them with local worker bundle imports before running in order to run smoothly.

> **_IMPORTANT:_** When you run the bundle or the executable binary, ensure you have the proper `.env` file in the same directory as the bundle or the binary.

> **_IMPORTANT:_** `deno compile` is currently not supporting web workers, so bcrypt functions MUST be used in their "sync" form in order to work. If you are planning to compile the program, you must replace async/await bcrypt functions with their sync versions that are not using web workers. However, sync functions are blocking and have huge impact on performance. It is not recommended to use the compiled program, this option is here only as illustration for now.

## Built With

 - [Deno](https://deno.land/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Drash](https://drash.land/drash/v1.x/#/)
 - [Cotton](https://rahmanfadhil.github.io/cotton/)
 - [Zod](https://github.com/colinhacks/zod)
 - [JWT](https://jwt.io/)
 - [bcrypt](https://github.com/JamesBroadberry/deno-bcrypt)

## Performance

Performance tests and their results can be seen [here](https://github.com/mitom18/deno-vs-nodejs-autocannon#deno).

## Licence

MIT