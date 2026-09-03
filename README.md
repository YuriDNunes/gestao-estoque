# Inventory Management

Web system for managing inventory, users, managers, and product allocations. The application was developed in React with Vite and Material UI, and it integrates with a Java/Spring Boot backend API running locally at `http://localhost:8080`.

## Overview

This project allows:

- authenticating users in the system with JWT;
- controlling access by profile/role;
- managing managers, users, and products;
- recording stock movements;
- allocating products to users;
- tracking allocation history;
- viewing allocated products and returning them.

## Features

### Administrator

- General dashboard;
- registration and management of managers;
- registration and management of users;
- product management;
- viewing movement history.

### Manager

- access to the dashboard;
- user management;
- product management;
- movement history;
- allocation of items to users' stock.

### User

- viewing allocated products;
- returning allocated items.

## Technologies

- React 19
- Vite
- React Router DOM
- Material UI
- JWT decode
- ESLint

## Project structure

```text
src/
├── components/
│   ├── ProductAllocationDialog.jsx
│   ├── ProtectedRoute.jsx
│   ├── ReturnAllocationDialog.jsx
│   ├── SideBar.jsx
│   └── StockMovementDialog.jsx
├── layouts/
│   ├── AdminLayout.jsx
│   └── AuthLayout.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── History.jsx
│   ├── Login.jsx
│   ├── Managers.jsx
│   ├── MyAllocations.jsx
│   ├── Products.jsx
│   └── Users.jsx
├── services/
│   ├── AllocationServices.js
│   ├── HistoryServices.js
│   ├── ManagerServices.js
│   ├── ProductServices.js
│   └── UserServices.js
├── theme/
│   └── index.js
├── utils/
│   └── auth.js
├── App.jsx
├── main.jsx
└── ...
```

## Main routes

- `/` - login screen
- `/admin/dashboard` - main dashboard
- `/admin/managers` - manager management
- `/admin/users` - user management
- `/admin/products` - product management
- `/admin/history` - movement history
- `/my-products` - products allocated to the logged-in user

## Requirements

Before starting, make sure you have installed:

- Node.js 18+
- npm or yarn
- a functional backend API with authentication and inventory endpoints

## Installation

```bash
npm install
```

## Running the project

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Production build

```bash
npm run build
```

To preview the generated build:

```bash
npm run preview
```

## Important notes

- The frontend expects the backend to be running at `http://localhost:8080`.
- The JWT token is stored in `localStorage` under the key `meu_token_jwt`.
- Navigation and permissions depend on the user's roles, such as `ROLE_Admin`, `ROLE_Manager`, and `ROLE_User`.
- The application is designed to work together with a backend responsible for authentication, users, products, and allocations.

## Available scripts

```bash
npm run dev      # starts the development server
npm run build    # generates the production version
npm run preview  # previews the build locally
npm run lint     # runs static code analysis
```

## Author

Project in development for inventory management and internal logistics.
