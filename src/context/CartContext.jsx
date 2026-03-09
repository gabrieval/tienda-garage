import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // Si el producto ya existe, actualizar cantidad
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      // Si no existe, agregar nuevo producto
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Limpiar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Obtener cantidad total de items (suma de todas las cantidades)
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener precio total del carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Obtener cantidad de un producto específico en el carrito
  const getProductQuantity = (productId) => {
    const product = cart.find(item => item.id === productId);
    return product ? product.quantity : 0;
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getTotalQuantity,
    getTotalPrice,
    getProductQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
