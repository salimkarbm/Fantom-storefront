# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.


## Products

  - Index 
  - Show
  - Create [token required]
  - Top 5 most popular products 
  - Products by category (args: product category)

  > Additionally the following additional 'products' routes have been added (together with their models/handlers) to aid current/future implementation

  - Update [token required] 
  - Delete [token required] 


## Users

  - Index [token required]
  - Show [token required]
  - Create

  > Additionally the following additional 'users' routes have been added (together with their models/handlers) to aid current/future implementation

  - Update [token required] 
  - Delete [token required] 


## Orders

  - Current Order by user (args: user id)[token required]
  - Completed Orders by user (args: user id)[token required]

  > Additionally the following additional 'orders' routes have been added (together with their models/handlers) to aid current/future implementation

  - show Order by user (args: user id)[token required]
  - Update [token required] 
  - Delete [token required] 

# Data Shapes

## Product

  - id
  - name
  - price
  - category

## User

  - id
  - firstName
  - lastName
  - password

> Additionally the following additional 'user' column have been added to aid the developers current/future implementation

  - email
  - roles

## Orders

  - id
  - id of each product in the order
  - quantity of each product in the order
  - user_id
  - status of order (active or complete)


# API Endpoints

> The development link is hosted on http://localhost:3000/ or whatever you want it to be.

## Products

Create new products in the store. (Only authenticated users can add new products to the store). The following data is required to create a product:

Method: **POST**\
Url: **/api/products**\
Body params:

  ```
  {
    name: "",
    price: "",
    category: ""
  }
  ```
  Success Response\
  status code 200

 Error Response\
  status code 404

  ```
  {
    "error": {
    "message": "error"
      }
  }
  ```

Display all available products

Method: **GET**\
Url: **/api/products**

Displays a single product

Method: **GET**\
Url params: **product id**\
Url: **/api/products/:id**

Display products by their category

Method: **GET**\
Url params: **category**<br>
Url: **/api/products?category**

Update products. The following data is required to update a product:

Method: **PUT**\
Url: **/api/products/:id**\
Body params:

  ```
  {
  name: "",
  price: "",
  category: "",
  }
  ```

Delete a product

Method: **DELETE**\
Url params: **product id**\
Url: **/api/products/:id**


## Users

Create new users. The following data is required to create a user:

Method: **POST**\
Url: **/api/users**\
Body params:

  ```
  {
  firstName: "",
  lastName: "",
  password: "",
  email: ""
  }
  ```
Success Response\
 status code 200

Error Response\
 status code 404

  ```
  {
    "error": {
    "message": "error"
      }
  }
  ```

Display all available users

Method: **GET**\
Url: **/api/users**


Displays a single user

Method: **GET**\
Url params: **userId**<br>
Url: **/api/users/:id**

Login existing user. The following data is required to authenticate a user:

Method: **POST**\
Url: **/api/users/:id**\
body params:
```
{
  email: "",
  password: ""
}
```
Success Response\
 status code 200

Error Response\
 status code 404

  ```
  {
    "error": {
    "message": "error"
      }
  }
  ```

Delete a user

Method: **DELETE**\
Url params: **user id**\
Url: **/api/users/:id**

Update users. The following data is required to update a user:

Method: **Patch**\
Url: **/api/users/:id**\
Body params:

  ```
  {
  firstname: "",
  lastname: "",
  email: "",
  }
  ```

## Orders

Displays complete orders

Method: **GET**\
Url params: **user id**<br>
Url: **/api/users/:id/complete-orders**

Displays current orders

Method: **GET**\
Url params: **user id**<br> 
Url: **/api/users/:id/current-orders**

Add products to orders

Method: **POST**\
Url params: **orderId and productId**<br>
Url: **/api/orders/:id/product/:id**

display a single orders

Method: **GET**\
Url params: **orderId**<br> 
Url: **/api/orders/:id**

display all orders

Method: **GET**\
Url: **/api/orders**

create new orders (Only authenticated users can add new orders to cart).

Method: **POST**\
Url: **/api/orders**\
body params:

```
{
  status: "",
}
```

Delete an order

Method: **DELETE**\
Url params: **order id**\
Url: **/api/orders/:id**
