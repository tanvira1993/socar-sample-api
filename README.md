# Api-Server Setup Guide

1. clone the repository
2. run the below command

```
yarn install
```

3. set up .env file in the root directory with these below variable

```
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
PORT=//db port
DB_DATABASE=//db name
DB_CLIENT=mysql
SECRET=//a secret key
```

4. now run the migrate command to get the db tables

```
yarn migrate
```

5. now run the seed command to get a user credential

```
yarn seed
```

6. In the project directory, you can run below command and enjoy api

```
yarn start
```

7. here is the user credential to login here, all api here is protected except login

```
email: "admin@gmail.com",
password: '12345678',

```

8. I have the Swagger for the api documentation but it's not complete due to time shortage

```
http://localhost:5000/api-docs
```
