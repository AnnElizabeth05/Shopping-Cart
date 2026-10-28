# The Style Studio - Redux Shopping Cart

A premium Shopping Cart application built with React, Redux Toolkit, React Router, and React Bootstrap.

## How to Install and Run
1. Install dependencies:
   `npm install`
2. Start the development server:
   `npm run dev`
3. Open the local link (usually http://localhost:5173) in your browser.

## How Redux is Used in this Project

- **`createSlice()`**: Used in `src/redux/cartSlice.js` to create the cart state and define the reducers (`addToCart`, `increaseQuantity`, `decreaseQuantity`, `removeFromCart`, `clearCart`, `saveUserDetails`, `addOrderToHistory`).
- **`configureStore()`**: Used in `src/redux/store.js` to combine the cart reducer and create the global Redux store.
- **`Provider`**: Used in `src/main.jsx` to wrap the `<App />` component, making the Redux store available to all components.
- **`useSelector()`**: Used in components like `NavbarComponent.jsx`, `Cart.jsx`, and `OrderHistory.jsx` to read data from the store.
- **`useDispatch()`**: Used in components like `ProductCard.jsx`, `CartItem.jsx`, and `Checkout.jsx` to dispatch actions when the user interacts with the app.

## Features
- Browse products with a beautiful, responsive layout.
- Search bar and Category Filter (Bonus Challenge).
- Add to cart, increase/decrease quantity, remove items, and clear cart.
- Multi-page experience using React Router (Home, Shop, Cart, Checkout, Order History).
- Complete Checkout flow with a form for shipping details.
- Order History page to view past purchases.
