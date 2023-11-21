# ShopWay

> An eCommerce Platform built with the MERN stack, Redux and Bootstrap.

Check it out: [ShopWay](https://shopway-aw74.onrender.com)


<!-- toc -->
## Table of Contents

- [App's Expertise](#apps-expertise)
- [Features](#features)
  
- [Usage](#usage)
  - [Env Variables](#env-variables)
  - [Dependencies Installation (Frontend & Backend)](#dependencies-installation-frontend--backend)
  - [Run](#run)
    
- [Build & Deploy](#build--deploy)
  - [Seed Database](#seed-database)
  
- [Test User Logins](#test-user-logins)
  
- [FAQ: How to use Vite instead of CRA?](#faq-how-to-use-vite-instead-of-cra)
  - [Setting up the proxy](#setting-up-the-proxy)
  - [Setting up linting](#setting-up-linting)
  - [Vite outputs the build to /dist](#vite-outputs-the-build-to-dist)
  - [Vite has a different script to run the dev server](#vite-has-a-different-script-to-run-the-dev-server)
 
---

<!-- tocstop -->

## App's Expertise:
- User-Centric Design:
  - A seamless shopping experience with intuitive features like product search, a dynamic top products carousel, and a user-friendly shopping cart, enhancing user satisfaction and engagement.

- Advanced Administrative Tools:
  - Robust admin functionalities, including product and user management, order tracking, and delivery status updates, contributing to streamlined operations and efficient business processes.


## Features

- General Features
  - Product Search Functionality
  - Top Products Carousel on Home Screen
  - Shopping Cart Functionalities - Add to Cart, Change Quantity, Delete From Cart
  - Checkout Processes - Shipping, Payment Method, Place Order
  - PayPal / Credit Card Integration for Making Payment
  - Product Rating and Review Section
  - Product Pagination
  - Database Seeder for Users and Products - Import Data, Destroy Data

- User Features (For both Admin and Customer)
  - User Registration
  - User Authentication
  - User Profile - Update Profile, Order Details

- Admin Features
  - Product Management - Create New Product, Edit Product, Delete Product
  - User Management - Edit User, Delete User
  - Order Management - 'Mark as Delivered' Option
---
    

## Usage

- Create a MongoDB Database and Obtain Your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal Account and Obtain Your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = <your mongodb uri>
JWT_SECRET = <any random string>
PAYPAL_CLIENT_ID = <your paypal client id>
PAGINATION_LIMIT = <as per your choice, for example: 8>
```

### Dependencies Installation (Frontend & Backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```
---


## Build & Deploy

```
# Create Frontend Product build
cd frontend
npm run build
```

### Seed Database

Following commands can be used to seed the database with some sample users and products as well as destroy all data:

```
# Import Data
npm run data:import

# Destroy Data
npm run data:destroy
```
---


## Test User Logins

Here are some test user credentials:
```
tu1@email.com (Customer)
123

tu2@email.com (Customer)
123
```

---


## FAQ: How to use Vite instead of CRA?

There are a few differences encountered while using Vite in place of CRA:

#### Setting up the proxy

Using CRA, a `"proxy"` setting in the frontend/package.json is added to avoid
breaking the browser [Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) in development.
In Vite, the proxy is set in 
[vite.config.js](https://vitejs.dev/config/server-options.html#server-proxy).

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // proxy requests prefixed '/api' and '/uploads'
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
```

#### Setting up linting

By default CRA outputs linting from eslint to the terminal and the browser console.
To get Vite to ouput linting to the terminal a [plugin](https://www.npmjs.com/package/vite-plugin-eslint) is needed to be added as a
development dependency...

```bash
npm i -D vite-plugin-eslint

```

Then add the plugin to the **vite.config.js**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import the plugin
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // setup the plugin
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    }),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
```

By default the eslint config that comes with a Vite React project treats some
rules from React as errors which will break the app.
Those rules can be changed to give a warning instead of an error by modifying
the **eslintrc.cjs** that came with the Vite project.

```js
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // turn this one off
    'react/prop-types': 'off',
    // change these errors to warnings
    'react-refresh/only-export-components': 'warn',
    'no-unused-vars': 'warn',
  },
};
```

#### Vite outputs the build to '/dist'

Create React App by default outputs the build to a **/build** directory and this is
what served from the backend in production.  
Vite by default outputs the build to a **/dist** directory so some adjustments are needed to be made
to the [backend/server.js](https://github.com/bradtraversy/proshop-v2/tree/main/backend/server.js)
from...

```js
app.use(express.static(path.join(__dirname, '/frontend/build')));
```

to...

```js
app.use(express.static(path.join(__dirname, '/frontend/dist')));
```

and...

```js
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
);
```

to...

```js
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
);
```

#### Vite has a different script to run the dev server

In a CRA project, the command `npm start` is used to run the development server. In Vite, the development server is started with `npm run dev`  
If the **dev** script is used in the root pacakge.json to run the project
using concurrently, then following changes should be made to root package.json
scripts from...

```json
    "client": "npm start --prefix frontend",
```

to...

```json
    "client": "npm run dev --prefix frontend",
```

Or the frontend/package.json scripts can also be changed to use `npm
start` as...

```json
    "start": "vite",
```

#### Note:

Vite requires React component files to be named using the `.jsx` file
type. 
The entry point to the app will be in `main.jsx` instead of `index.js`

---
