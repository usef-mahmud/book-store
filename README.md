# Book Store API
 this project is an api for online book store, I implemented to just apply my old knowladge in back-end development and try some new things I'm currently learning.

It's based on nodejs and express as development tools, and mongoDB as a database.

## installation
if you intersted in the project and want to run on your machine, just clone it using this command

```
git clone https://github.com/usef-mahmud/book-store.git
```

and install dependencies with ```npm install```, you will also need to create .env file with the following format:
```
DB_URI= your_mongodb_URI
SECRET_KEY= jwt_encryption_secret_key
```

## technologies
* NodeJs
* ExpressJs
* mongoDB
* express-validator
* JWT
* bcryptjs

## structure

the project has 3 main sections **users**, **book** and **orders**.
users are able to access an buy public books on the store. some with admin role can upload books and change its visibility.

every buying process is saved on database as an order document that admins can access an make some decisions with it such as decline or accept.

## project process

the project is still under development so you can **watch** this repo to keep upadted with the new features I'm pushing.

## future intentions

I'm deciding in the future to make it a full stack project with **ReactJs** as a forntend framework