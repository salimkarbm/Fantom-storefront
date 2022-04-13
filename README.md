# Fantom-storefront
Fantom is an online shopping store Api that display products available for purchase.

# API Functionality
An Express based RESTful API design was used to access a Postgres database for data storage and retrieval.
Using JWT tokens to provide stateless authenticated access for retreiving and storing data in persistent storage.

This API provides the following Endpoints :

1.  Create products for the online store
2.  View all the products that are available in the store
3.  View all the products in different category
4.  View a single product
5.  update and Delete product 
6.  Create, update, delete users account
7.  Authenticate users account
8.  List available users
9.  Allow authenticated users to place an order on a product
10. show details and add products to Orders using a shopping basket


# Technologies used

This project was build with the following stack:

1. [Node](https://nodejs.org/en/) (Javacript runtime).
2. [Express](https://expressjs.com/) (For creating endpoints, routing, and serving files).
3. [TypeScript](https://www.typescriptlang.org/) (A super set of Javacript).
4. [Jasmine](https://jasmine.github.io/pages/docs_home.html) (for testing).
5. [jsonwebtoken](https://jwt.io/) (JWT) (for stateless interaction).
6. [PostgreSQL](https://www.postgresql.org/) (for creating database).

All of these dependencies required are listed in the package.json file. Use `npm install` on the command line. Environment variables are defined in a .env file.

> However, you will need to install node and postgreSQL on your local machine


# Installation and Environment Setup

The following steps outline will set you up on how to install the app on your local machine.

1. Clone this repository 

```
git clone https://github.com/salimkarbm/fantom-storefront
```
2. From the terminal, change directory to storefront app folder 

```
cd fantom-storefront
```
3. Run `npm install` This will install the necessary packages and dependencies based on the supplied package.json.

4. Then run the app with the command `npm run dev`

5. Once these are set, start an instance of Postgres ensure Postgres is started on port **5432**.

NOTE: Depending on your system configuration it may be necessary to install db-migrate globally, i.e.

```
npm intstall -g db-migrate
```

If you wish to contribute to this project, before any of the steps above, you would need to fork this project first. You're ready to hack (and | or contribute) :v:

# Setup the required databases

In order to use the API you must pre-configure the initial database. To do so access the psql prompt as postgres on the installed Postgres database and enter the following commands at the prompt:

```
CREATE DATABASE fantom-storefront;
CREATE DATABASE test;

```

# Running the Jasmine Tests

To run the jasmine tests use the following commands:

```
npm run test-db
```
this will run migration test and drop the test database.

To run models and endpoints test run the following command on the psql terminal

```
CREATE DATABASE test;
```
this will craete the test database 


then run the following command on your project directory

```
npm run test
```

# Usage

The endpoints available for interacting with the API can be found in the requirements.md file

# :handshake: Contributing
Contributions, issues and feature requests are welcome!

# Authors

Github: @salimkarbm
LinkedIn: Salim Imuzai
Twitter: @salimkarbm

# Show your support

   - Give a :star: if you like this project