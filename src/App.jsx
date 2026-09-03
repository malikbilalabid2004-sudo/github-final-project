import { useState } from 'react';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

export default function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleContinueShoppingClick = () => {
    setShowCart(false);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    setShowCart(false);
  };

  if (showProductList && showCart) {
    return (
      <CartItem
        onHomeClick={handleHomeClick}
        onContinueShoppingClick={handleContinueShoppingClick}
      />
    );
  }

  if (showProductList) {
    return (
      <ProductList
        onHomeClick={handleHomeClick}
        onCartClick={handleCartClick}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="landing-page">
        <div className="background-image"></div>

        <div className="content">
          <p className="eyebrow">A neighborhood greenhouse, online</p>

          <h1>Welcome to Paradise Nursery</h1>

          <AboutUs />

          <button
            type="button"
            className="btn btn-primary get-started"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
