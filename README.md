# Api-Server Setup Guide

1. clone the repository
2. run the below command

### `yarn install`

3. set up .env file in the root directory with these below variable

### `DB_USER=`

### `DB_PASSWORD=`

### `DB_HOST=localhost //host`

### `PORT=//db port`

### `DB_DATABASE=//db name`

### `DB_CLIENT=mysql`

### `SECRET=//a secret key`

4. now run the migrate command to get the db tables

### `yarn migrate`

5. In the project directory, you can run below command and enjoy api

### `yarn start`

6. I have the Swagger for the api documentation but it's not complete due to time shortage

### `http://localhost:5000/api-docs`
