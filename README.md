# Salesprit

Salesprit is a functional web-based Food POS (Point of Sale) application for managing online food orders. It allows browsing menus, adding products to the cart, placing orders, and managing user accounts. The application is responsive and optimized for performance.

![Salesprit Logo](https://i.imgur.com/RzAFq5W.png)

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Application Routes](#application-routes)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## 🌐 Demo

Check out the live version of the application at: [https://salesprit-food-pos.vercel.app](https://salesprit-food-pos.vercel.app).

## ✨ Features

- **Menu Browsing**: Browse the product catalog with filtering by category and searching by product name.
- **Shopping Cart**: Add products and manage their quantities before checkout, powered by a simple state management system with Redux Toolkit.
- **Order Placement**: Place orders by selecting delivery methods and paying online through integration with Stripe.
- **User Account**: Sign up, log in, and manage your personal data with secure authentication via Firebase.
- **Favorite Products**: Save interesting products for later, storing them in a database.
- **Order History**: Review your purchase history and order status in a clear dashboard.

## 🛠️ Technologies

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/)
- [React Router](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

## 📁 Project Structure

```
salesprit/
├── api/                # API endpoints (e.g., Stripe webhook)
├── src/                # Application source code
│   ├── components/     # UI components (buttons, cards, inputs)
│   ├── features/       # Application features (auth, cart, menu, orders)
│   ├── layout/         # Layout components (header, navigation, dashboard)
│   ├── pages/          # Application pages (menu, account, orders)
│   ├── schema/         # Data validation schemas (Zod)
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions
│   └── lib/            # Configurations and services (Firebase, store)
├── public/             # Static assets (images, logo)
└── vite.config.ts      # Vite configuration
```

## 🛤️ Application Routes

| Path                     | Description                          | Function Overview            |
| ------------------------ | ------------------------------------ | ---------------------------- |
| `/`                      | Home page with product menu.         | Browse and select products.  |
| `/login` and `/register` | Pages for logging in and signing up. | User authentication.         |
| `/account`               | User panel for managing data.        | Update personal information. |
| `/orders`                | User's order history.                | View past orders.            |
| `/orders/:orderId`       | Details of a specific order.         | Review order specifics.      |
| `/favorites`             | List of user's favorite products.    | Manage saved products.       |

## 📦 Installation

To run the project locally, follow these steps:

1. **Requirements**: Ensure you have Node.js (recommended LTS version) and npm installed.
2. **Clone the Repository**: Clone this repository to your computer:
   ```
   git clone https://github.com/[username]/salesprit.git
   cd salesprit
   ```
3. **Install Dependencies**: Install all required packages:
   ```
   npm install
   ```
4. **Set Environment Variables**: Create a `.env` file in the root directory of the project and configure the environment variables necessary for the application to run. Below is a list of variables along with descriptions of their purpose:
   - **`VITE_STRIPE_SECRET_KEY`**: Private API key for Stripe to handle payments. Copy the key from your Stripe account (test or production mode).
   - **`VITE_STRIPE_WEBHOOK_SECRET`**: Secret key for Stripe webhooks. Copy the key from your Stripe webhook configuration.
   - **`VITE_APP_URL`**: Application URL (default is `http://localhost:3000` for local environment). No changes needed if running locally.

## 🚀 Usage

After configuring the project, launch the application in development mode:

```
npm run dev
```

The application will be available at `http://localhost:3000`. You can browse the menu, create an account, add items to your cart, and place orders. Features like online payments require proper configuration of environment variables.

If you want to build and run the production version:

```
npm run build
npm run preview
```

## 📸 Screenshots

Below are screenshots showcasing various features of the Salesprit application:

![Login Screen](https://i.imgur.com/heRpwQD.png)  
_Login Screen_

![Product List and Cart](https://i.imgur.com/nDQ98lZ.png)  
_Product List and Cart_

![Order History](https://i.imgur.com/3Ecfpld.png)  
_Order History_

![Order Details](https://i.imgur.com/YzPAPAM.png)  
_Order Details_

![Account Settings](https://i.imgur.com/fUBMpLI.png)  
_Account Settings_

![Wishlist](https://i.imgur.com/bXK3j6W.png)  
_Wishlist_

## 🤝 Contributing

If you want to help with the development of Salesprit, you're welcome! You can report bugs, suggest improvements, or share your feedback through code reviews. Contact me via GitHub Issues to share your insights.
