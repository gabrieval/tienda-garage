import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { getProductImageSrcs } from "../utils/productImages";
import { formatMoney } from "../utils/money";

const ItemDetail = ({ product, onAddToCart, quantityAdded }) => {
  if (!product) {
    return <div>Cargando...</div>;
  }

  const imageSrcs = useMemo(() => getProductImageSrcs(product.image), [product.image]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setActiveIdx(0);
  }, [product?.id]);

  const activeSrc = imageSrcs[activeIdx] || imageSrcs[0] || "";

  return (
    <div className="item-detail">
      <div className="detail-container">
        <div className="detail-image">
          <img src={activeSrc} alt={product.name} />

          {imageSrcs.length > 1 && (
            <div className="detail-thumbs" role="list" aria-label="Imágenes del producto">
              {imageSrcs.map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  className={`detail-thumb ${idx === activeIdx ? "is-active" : ""}`}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Ver imagen ${idx + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="price">{formatMoney(product.price)}</p>
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
