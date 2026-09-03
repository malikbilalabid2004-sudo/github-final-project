import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from '../redux/CartSlice';
import { categories } from '../data/plants';
import PlantArt from './PlantArt';
import Header from './Header';

export default function ProductList({ onHomeClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cartIds = new Set(cartItems.map((item) => item.id));

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div className="app-container">
      <Header
        view="products"
        onHomeClick={onHomeClick}
        onProductsClick={() => {}}
        onCartClick={onCartClick}
      />

      <main className="product-list">
        <div className="product-list-intro">
          <h1>The Catalog</h1>
          <p>
            Eighteen plants, three ways to fill a room. Everything ships
            hand-checked and ready to pot.
          </p>
        </div>

        {categories.map((category) => (
          <section
            key={category.id}
            className="category-section"
            aria-labelledby={`${category.id}-heading`}
          >
            <div className="category-heading">
              <h2 id={`${category.id}-heading`}>{category.name}</h2>
              <p>{category.blurb}</p>
            </div>

            <div className="plant-grid">
              {category.plants.map((plant) => {
                const inCart = cartIds.has(plant.id);

                return (
                  <article className="plant-card" key={plant.id}>
                    <div className="plant-thumb">
                      <PlantArt {...plant.art} className="plant-svg" />
                    </div>

                    <h3>{plant.name}</h3>

                    <p className="plant-description">
                      {plant.description}
                    </p>

                    <div className="plant-footer">
                      <span className="price-tag">
                        ${plant.price}
                      </span>

                      <button
                        type="button"
                        className="btn btn-add"
                        disabled={inCart}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {inCart ? 'Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
