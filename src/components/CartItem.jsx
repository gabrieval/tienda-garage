import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    if (item.quantity < item.stock) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src={item.image}
            alt={item.name}
            className="img-fluid rounded-start h-100 object-fit-cover"
            style={{ maxHeight: '200px' }}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text text-muted">${item.price.toFixed(2)} c/u</p>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleRemove}
                title="Eliminar del carrito"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleDecrement}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="fw-bold px-3">{item.quantity}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleIncrement}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
                <small className="text-muted ms-2">
                  (Stock: {item.stock})
                </small>
              </div>

              <div className="text-end">
                <div className="text-muted small">Subtotal</div>
                <div className="h5 mb-0">${subtotal.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
