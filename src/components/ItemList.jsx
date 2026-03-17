import { Link } from "react-router-dom";
import { getPrimaryProductImageSrc } from "../utils/productImages";
import { formatMoney } from "../utils/money";

const ItemList = ({ products = [] }) => {
  return (
    <div className="item-list">
      {products.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="item-card">
            <img src={getPrimaryProductImageSrc(product.image)} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">{formatMoney(product.price)}</p>
            <p className="description">{product.description}</p>
            <Link to={`/item/${product.id}`} className="detail-link">
              Ver Detalle
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ItemList;
