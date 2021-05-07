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

# Build the production version
vr bundle

# Run the production version
vr start-bundle

# Compile the production version to executable binary
vr compile-bundle
```
If you don't have Velociraptor installed, see `scripts.yml` for commands you need to run.

> **_IMPORTANT:_** `deno bundle` has currently problems with used Zod library, so you need to review the bundle before running or compiling it and replace every usage of `mod11` to `mod10`.

> **_NOTE:_** `deno compile` is currently not supporting web workers, so bcrypt's functions must be used in their "sync" form in order to work. If you are not planning to compile the program, you can replace sync functions with their async/await versions that are using web workers.

## Built With

 - [Deno](https://deno.land/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Drash](https://drash.land/drash/v1.x/#/)
 - [Cotton](https://rahmanfadhil.github.io/cotton/)
 - [Zod](https://github.com/colinhacks/zod)
 - [JWT](https://jwt.io/)
 - [bcrypt](https://github.com/JamesBroadberry/deno-bcrypt)

## Licence

MIT