import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectCartItems, updateQuantity } from '../redux/CartSlice';
import PlantArt from './PlantArt';
import Header from './Header';

export default function CartItem({ onHomeClick, onContinueShoppingClick }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  // Sums the cost of every item in the cart (price * quantity, across all items).
  const calculateTotalAmount = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotalQuantity = () => items.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    alert('Checkout is coming soon!');
  };

  const totalAmount = calculateTotalAmount();
  const totalQuantity = calculateTotalQuantity();

  return (
    <div className="app-container">
      <Header view="cart" onHomeClick={onHomeClick} onProductsClick={onContinueShoppingClick} onCartClick={() => {}} />
      <main className="cart-page">
        <h1>Your Cart</h1>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Nothing potted up yet &mdash; the catalog is waiting.</p>
            <button type="button" className="btn btn-primary" onClick={onContinueShoppingClick}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-summary-line">
              <span>
                <strong>{totalQuantity}</strong> {totalQuantity === 1 ? 'plant' : 'plants'} in cart
              </span>
              <span className="cart-summary-total">Total: ${totalAmount.toFixed(2)}</span>
            </div>

            <ul className="cart-ledger">
              <li className="cart-ledger-header" aria-hidden="true">
                <span className="col-item">Item</span>
                <span className="col-unit">Unit price</span>
                <span className="col-qty">Quantity</span>
                <span className="col-line">Total</span>
                <span className="col-remove" />
              </li>
              {items.map((item) => (
                <li className="cart-row" key={item.id}>
                  <div className="col-item">
                    <div className="cart-thumb">
                      <PlantArt {...item.art} className="plant-svg" />
                    </div>
                    <span className="cart-item-name">{item.name}</span>
                  </div>
                  <span className="col-unit">${item.price.toFixed(2)}</span>
                  <span className="col-qty">
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => handleDecrement(item)}
                    >
                      &minus;
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </span>
                  <span className="col-line">${(item.price * item.quantity).toFixed(2)}</span>
                  <span className="col-remove">
                    <button
                      type="button"
                      className="remove-btn"
                      aria-label={`Remove ${item.name} from cart`}
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </span>
                </li>
              ))}
            </ul>

            <div className="cart-actions">
              <button type="button" className="btn btn-secondary" onClick={onContinueShoppingClick}>
                Continue Shopping
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
