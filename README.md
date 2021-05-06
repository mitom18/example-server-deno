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
```
If you don't have Velociraptor installed, see `scripts.yml` for commands you need to run.

## Built With

 - [Deno](https://deno.land/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Drash](https://drash.land/drash/v1.x/#/)
 - [Cotton](https://rahmanfadhil.github.io/cotton/)
 - [JWT](https://jwt.io/)

## Licence

MIT