# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints & Routes
### Products
- Index => **/products** `GET`
- Show => **/products/:id)** `GET`
- Create [token required] => **/products** `POST`
- Delete [token required] => **/products** `DELETE`
- [OPTIONAL] Five Most Expensive products => **/five-most-expensive** `GET`
- [OPTIONAL] Products in Orders => **/products-in-orders** `GET`
- [OPTIONAL] Top 5 most popular products - **Not Done**
- [OPTIONAL] Products by category (args: product category) - **Not Done**

### Users
- Index [token required] => **/users** `GET` 
- Show [token required] => **/users/:username** `GET` 
- Create [token required] => **/users** `POST`
- Delete [token required]=> **/users** `DELETE`
- Authenticate => **/user/authenticate** `POST`
### Orders
- Index => **/orders** `GET`
- Show => **/orders/:id** `GET`
- Create => **/orders** `GET`
- Delete => **/orders** `DELETE`
- Current Order by user (args: user id)[token required] => **/current-order-of-user** `GET`
- [OPTIONAL] Completed Orders by user (args: user id)[token required] => **/completed-orders-of-user** `POST`
- [OPTIONAL] Users with orders => **/users-with-orders** `GET`

## Data Shapes
### Product
- id `SERIAL PRIMARY KEY`
- name `VARCHAR(100) NOT NULL`
- price `DECIMAL(10,2) NOT NULL`

### User
- id `SERIAL PRIMARY KEY`
- firstName `VARCHAR(100) NOT NULL`
- lastName `VARCHAR(100) NOT NULL`
- username `VARCHAR(100) NOT NULL`
- password digest `VARCHAR NOT NULL`

### Order
- id `SERIAL PRIMARY KEY`
- user_id `bigint REFERENCES users(id))`
- status of order (active or complete) `VARCHAR(15) NOT NULL`

### Order-Product
- id `SERIAL PRIMARY KEY`
- id of each order `bigint REFERENCES orders(id)`
- id of each product `bigint REFERENCES products(id)`
- quantity of each product in the order `integer`
