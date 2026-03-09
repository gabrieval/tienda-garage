import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";

const ItemDetail = ({ product, onAddToCart, quantityAdded }) => {
  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="item-detail">
      <div className="detail-container">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>
          <p className="description">{product.description}</p>
          <p className="stock">Stock disponible: {product.stock}</p>

          {quantityAdded > 0 ? (
            <div className="mt-3">
              <div className="alert alert-success mb-3">
                Se agregaron {quantityAdded} unidad(es) al carrito
              </div>
              <div className="d-flex gap-2">
                <Link to="/cart" className="btn btn-primary flex-grow-1">
                  Ir al Carrito
                </Link>
                <Link to="/" className="btn btn-outline-secondary flex-grow-1">
                  Seguir Comprando
                </Link>
              </div>
            </div>
          ) : (
            <ItemCount stock={product.stock} onAddToCart={onAddToCart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
