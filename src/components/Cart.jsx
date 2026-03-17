import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { formatMoney } from "../utils/money";

const Cart = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const total = getTotalPrice();

  const handleWhatsAppOrder = () => {
    const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

    if (!rawNumber) {
      alert("No se pudo iniciar WhatsApp. Falta configurar el número de contacto.");
      return;
    }

    const phone = rawNumber.replace(/\D/g, "");

    const itemsText = cart
      .map((item) => {
        const subtotal = item.price * item.quantity;
        return `- ${item.name} x ${item.quantity} = ${formatMoney(subtotal)}`;
      })
      .join("\n");

    const message = `Hola, quiero hacer el siguiente pedido:\n\n${itemsText}\n\nTotal: ${formatMoney(total)}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="currentColor"
            className="text-muted mb-4"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.352L2.77 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 11.5H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.516l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <h2 className="mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">
            No hay productos en el carrito. Explora nuestro catálogo y agrega
            productos.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Carrito de Compras</h1>

      <div className="row">
        <div className="col-lg-8">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h5 className="card-title mb-3">Resumen del Pedido</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Productos ({cart.length})</span>
                <span>{formatMoney(total)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong className="h4">{formatMoney(total)}</strong>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                className="btn btn-primary w-100 mb-2"
              >
                Finalizar Compra
              </button>

              <button
                onClick={clearCart}
                className="btn btn-outline-danger w-100"
              >
                Vaciar Carrito
              </button>

              <Link to="/" className="btn btn-link w-100 mt-2">
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
