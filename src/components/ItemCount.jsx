import { useState } from "react";

const ItemCount = ({ stock = 0, onAddToCart }) => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(count);
    }
    setCount(1);
  };

  return (
    <div className="item-count">
      <div className="counter">
        <button onClick={handleDecrement} disabled={count <= 1}>
          -
        </button>
        <span className="count-display">{count}</span>
        <button onClick={handleIncrement} disabled={count >= stock}>
          +
        </button>
      </div>
      <button 
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={stock === 0}
      >
        {stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
      </button>
    </div>
  );
};

export default ItemCount;
