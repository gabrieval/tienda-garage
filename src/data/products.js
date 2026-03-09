// Productos mockeados (falsos) para la aplicación
const productosMockeados = [
  {
    id: 1,
    name: "Laptop HP Pavilion",
    price: 899.99,
    category: "electronics",
    description: "Laptop potente con procesador Intel Core i5, 8GB RAM y 256GB SSD. Ideal para trabajo y entretenimiento.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    stock: 15
  },
  {
    id: 2,
    name: "Mouse Logitech MX Master",
    price: 79.99,
    category: "electronics",
    description: "Mouse ergonómico inalámbrico de alta precisión. Perfecto para profesionales y gamers.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    stock: 30
  },
  {
    id: 3,
    name: "Teclado Mecánico RGB",
    price: 129.99,
    category: "electronics",
    description: "Teclado mecánico retroiluminado con switches Cherry MX. Ideal para gaming y programación.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    stock: 20
  },
  {
    id: 4,
    name: "Monitor Samsung 27\"",
    price: 299.99,
    category: "electronics",
    description: "Monitor Full HD de 27 pulgadas con tecnología IPS. Colores vibrantes y ángulos de visión amplios.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    stock: 12
  },
  {
    id: 5,
    name: "Auriculares Sony WH-1000XM4",
    price: 349.99,
    category: "electronics",
    description: "Auriculares inalámbricos con cancelación de ruido líder en la industria. Audio premium.",
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400",
    stock: 25
  },
  {
    id: 6,
    name: "Cámara Canon EOS Rebel",
    price: 649.99,
    category: "electronics",
    description: "Cámara DSLR profesional con sensor de 24MP. Perfecta para fotografía y video.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400",
    stock: 8
  },
  {
    id: 7,
    name: "Zapatillas Nike Air Max",
    price: 149.99,
    category: "clothing",
    description: "Zapatillas deportivas con tecnología Air Max para máximo confort. Estilo y rendimiento.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    stock: 40
  },
  {
    id: 8,
    name: "Remera Adidas Deportiva",
    price: 39.99,
    category: "clothing",
    description: "Remera deportiva de alta calidad con tecnología que absorbe la humedad.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    stock: 50
  },
  {
    id: 9,
    name: "Jeans Levi's 501",
    price: 89.99,
    category: "clothing",
    description: "Jeans clásicos Levi's 501 de corte recto. Estilo atemporal y duradero.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    stock: 35
  },
  {
    id: 10,
    name: "Campera North Face",
    price: 249.99,
    category: "clothing",
    description: "Campera impermeable y resistente al viento. Ideal para aventuras al aire libre.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    stock: 18
  },
  {
    id: 11,
    name: "Tablet Samsung Galaxy Tab",
    price: 449.99,
    category: "electronics",
    description: "Tablet Android de 10 pulgadas con pantalla Super AMOLED. Perfecta para multimedia.",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
    stock: 22
  },
  {
    id: 12,
    name: "Smartwatch Apple Watch Series 8",
    price: 399.99,
    category: "electronics",
    description: "Smartwatch con monitoreo de salud avanzado y GPS. Mantente conectado y saludable.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400",
    stock: 28
  }
];

// Simular delay de red (500ms - 2000ms)
const simularDelay = () => {
  return new Promise((resolve) => {
    const delay = Math.random() * 1500 + 500; // Entre 500ms y 2000ms
    setTimeout(resolve, delay);
  });
};

// Obtener todos los productos o filtrar por categoría
export const getProducts = (categoryId) => {
  return simularDelay().then(() => {
    if (categoryId) {
      const productosFiltrados = productosMockeados.filter(
        (producto) => producto.category === categoryId
      );
      return productosFiltrados;
    }
    return productosMockeados;
  });
};

// Obtener un producto por su ID
export const getProductById = (productId) => {
  return simularDelay().then(() => {
    const producto = productosMockeados.find(
      (producto) => producto.id === parseInt(productId)
    );

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    return producto;
  });
};

// Obtener todas las categorías únicas
export const getCategories = () => {
  return simularDelay().then(() => {
    const categoriasUnicas = [...new Set(productosMockeados.map((p) => p.category))];
    return categoriasUnicas;
  });
};
