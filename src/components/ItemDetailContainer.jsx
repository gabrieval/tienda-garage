import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { getProductById } from "../firebase/services";
import { useCart } from "../context/CartContext";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    setQuantityAdded(0);
    getProductById(itemId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [itemId]);

  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
    setQuantityAdded(quantity);
  };

  if (loading) {
    return <div className="item-detail-container"><p>Cargando producto...</p></div>;
  }

  if (error) {
    return <div className="item-detail-container"><p>Error: {error}</p></div>;
  }

  return (
    <div className="item-detail-container">
      <ItemDetail
        product={product}
        onAddToCart={handleAddToCart}
        quantityAdded={quantityAdded}
      />
    </div>
  );
};

export default ItemDetailContainer;
