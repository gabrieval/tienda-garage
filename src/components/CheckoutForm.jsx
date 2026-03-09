import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../firebase/services";

const CheckoutForm = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    emailConfirm: "",
    address: "",
    city: "",
    zipCode: ""
  });
  const [errors, setErrors] = useState({});

  // Redirigir si el carrito está vacío
  if (cart.length === 0 && !orderId) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <h2 className="mb-3">No hay productos en tu carrito</h2>
          <p className="text-muted mb-4">
            Agrega productos antes de finalizar la compra.
          </p>
          <Link to="/" className="btn btn-primary">
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  // Si ya se generó la orden, mostrar confirmación
  if (orderId) {
    return (
      <div className="container my-5">
        <div className="text-center py-5">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="currentColor"
              className="text-success"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          </div>
          <h1 className="mb-3">¡Compra realizada con éxito!</h1>
          <p className="text-muted mb-2">Gracias por tu compra.</p>
          <div className="alert alert-info d-inline-block">
            <strong>ID de tu orden:</strong>
            <div className="mt-2">
              <code className="fs-5">{orderId}</code>
            </div>
          </div>
          <p className="text-muted mt-3">
            Recibirás un email de confirmación con los detalles de tu pedido.
          </p>
          <Link to="/" className="btn btn-primary mt-3">
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\d{8,15}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "El teléfono debe tener entre 8 y 15 dígitos";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (formData.email !== formData.emailConfirm) {
      newErrors.emailConfirm = "Los emails no coinciden";
    }
    if (!formData.address.trim()) {
      newErrors.address = "La dirección es requerida";
    }
    if (!formData.city.trim()) {
      newErrors.city = "La ciudad es requerida";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "El código postal es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Preparar datos de la orden
      const order = {
        buyer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getTotalPrice(),
        date: new Date().toISOString()
      };

      // Crear orden en Firestore
      const id = await createOrder(order);
      setOrderId(id);
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al procesar tu compra. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const total = getTotalPrice();

  return (
    <div className="container my-5">
      <h1 className="mb-4">Finalizar Compra</h1>

      <div className="row">
        <div className="col-lg-7">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Datos de Contacto</h5>

              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="emailConfirm" className="form-label">
                    Confirmar Email *
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.emailConfirm ? "is-invalid" : ""}`}
                    id="emailConfirm"
                    name="emailConfirm"
                    value={formData.emailConfirm}
                    onChange={handleChange}
                  />
                  {errors.emailConfirm && (
                    <div className="invalid-feedback">{errors.emailConfirm}</div>
                  )}
                </div>

                <h5 className="mt-4 mb-3">Dirección de Envío</h5>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>

                <div className="row mb-3">
                  <div className="col-md-8">
                    <label htmlFor="city" className="form-label">
                      Ciudad *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? "is-invalid" : ""}`}
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="zipCode" className="form-label">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.zipCode ? "is-invalid" : ""}`}
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                    {errors.zipCode && (
                      <div className="invalid-feedback">{errors.zipCode}</div>
                    )}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary flex-grow-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Procesando...
                      </>
                    ) : (
                      "Confirmar Compra"
                    )}
                  </button>
                  <Link to="/cart" className="btn btn-outline-secondary">
                    Volver
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-body">
              <h5 className="card-title mb-3">Resumen del Pedido</h5>

              <div className="mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <div>
                      <div className="fw-bold">{item.name}</div>
                      <small className="text-muted">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </small>
                    </div>
                    <div className="fw-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Envío</span>
                <span className="text-success">Gratis</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong className="h4">${total.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
