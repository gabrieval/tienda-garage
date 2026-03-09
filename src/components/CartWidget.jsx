import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartWidget() {
  const { getTotalQuantity } = useCart();
  const totalItems = getTotalQuantity();

  return (
    <Link to="/cart" className="text-decoration-none text-white">
      <div className="d-flex align-items-center gap-2" style={{ lineHeight: '1' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.352L2.77 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 11.5H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.516l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        {totalItems > 0 && (
          <span className="badge bg-danger" style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}>
            {totalItems}
          </span>
        )}
      </div>
    </Link>
  );
}

export default CartWidget;
