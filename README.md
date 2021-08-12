# E-Shop eCommerce Application

### ABOUT- 
***
  #### A Full Stack E-Commerce Application developed using MERN Stack deployed on Heroku. Backend is functional with Admin & Protect Middleware for access Protected Routes. Frontend Centralized with Redux Store.
  
  
### FEATURES-
***

>##### ➤ Functional Shopping Cart.
>##### ➤ PayPal & Credit/Debit Payment Gateway.
>##### ➤ Admin Functionalities.
>##### ➤ Users List Screen: Update User & Delete Functionality
>##### ➤ Products List Screen: Create Product & Delete Functionality
>##### ➤ Orders List Screen: Screen for all Orders to be delivered
>##### ➤ Product Reviews and Ratings.
>##### ➤ Product Pagination
>##### ➤ Top Rated Products Carousel.
>##### ➤ Product Search Feature with name filter.
>##### ➤ LoggedIn User Profile with Order Status.
>##### ➤ Checkout Process (Shipping,Order Details, Payment method)
>##### ➤ Seeding Database with Sample data.


### SPECIFICATIONS-
***

  >##### ✱ Backend is functional with Admin & Protect Middleware for access Protected Routes.
  >##### ✱ Frontend Centrilized with Redux Store.
  >##### ✱ React-Bootstrap used for Styling the UI.
  >##### ✱ Local Storage has been used efficiently for Cart & Shipping Details.
  >##### ✱ Admin Section has the option of Mark as Delivered.
  >##### ✱ Use of multer Package for Image Uploading of Product.
  >##### ✱ Orders Screen showing the status of previous & current orders.
  >##### ✱ Fully Featured Cart Functionality with quantity select & proceed.
  >##### ✱ Application is Responsive for all Screen types.
  >##### ✱ Deployed using HEROKU CLI with postBuild Script.

### SCRIPTS-
***
```
  ☛ npm run client - Run Frontend 
  ☛ npm run server - Run Backend 
  ☛ npm run dev - Run Both
```

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
