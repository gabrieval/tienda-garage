# E-commerce Web App

Aplicación web de e-commerce desarrollada con React como proyecto final del curso de React de CoderHouse.

## Descripción

Esta es una Single Page Application (SPA) de ecommerce que permite a los usuarios navegar por un catálogo de productos, filtrarlos por categoría, ver detalles de cada producto, agregar items al carrito de compras y finalizar una compra generando una orden en Firebase.

## Tecnologías Utilizadas

- **React 18** - Librería principal para la interfaz de usuario
- **React Router DOM** - Navegación entre páginas (SPA)
- **Firebase/Firestore** - Base de datos en la nube para productos y órdenes
- **Bootstrap 5** - Framework CSS para estilos
- **Vite** - Build tool y desarrollo rápido

## Características Implementadas

### Funcionalidades Principales

- ✅ **Catálogo de productos** - Listado completo con imágenes, precios y descripciones
- ✅ **Filtrado por categorías** - Navegación entre diferentes categorías de productos
- ✅ **Detalle de producto** - Vista detallada de cada producto con stock disponible
- ✅ **Carrito de compras** - Sistema completo con Context API
  - Agregar productos con cantidad seleccionable
  - Modificar cantidades desde el carrito
  - Eliminar productos del carrito
  - Visualización de subtotales y total
- ✅ **Checkout** - Formulario de compra con validaciones
- ✅ **Generación de órdenes** - Las compras se guardan en Firestore
- ✅ **Renderizado condicional** - Loaders, mensajes de carrito vacío, sin stock, etc.

### Componentes

```
App
├── NavBar
│   └── CartWidget
├── ItemListContainer
│   └── ItemList
│       └── Item
├── ItemDetailContainer
│   └── ItemDetail
│       └── ItemCount
├── Cart
│   └── CartItem
└── CheckoutForm
```

## Estructura del Proyecto

```
entrega_final/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── CartWidget.jsx
│   │   ├── ItemListContainer.jsx
│   │   ├── ItemList.jsx
│   │   ├── ItemDetailContainer.jsx
│   │   ├── ItemDetail.jsx
│   │   ├── ItemCount.jsx
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── CheckoutForm.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── firebase/
│   │   ├── config.js
│   │   ├── services.js
│   │   └── seedProducts.js
│   ├── data/
│   │   └── products.js (mock data de respaldo)
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/gabrieval/react-entrega.git
cd entrega_final
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Firebase ya está configurado

✅ El proyecto ya está conectado a Firebase Firestore
✅ Los productos ya están cargados en la base de datos
✅ Las credenciales están en `src/firebase/config.js`

**Nota:** Si necesitas usar tu propia base de datos Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto y activa Firestore Database (modo de prueba)
3. Reemplaza las credenciales en `src/firebase/config.js`
4. Usa el script `src/firebase/seedProducts.js` para cargar los productos

### 4. Iniciar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Navegación

- `/` - Página principal con todos los productos
- `/category/:categoryId` - Productos filtrados por categoría
- `/item/:itemId` - Detalle de un producto específico
- `/cart` - Carrito de compras
- `/checkout` - Formulario de checkout

## Firebase Collections

### Collection: `products`

Cada documento contiene:

```javascript
{
  name: "string",
  price: number,
  category: "string",
  description: "string",
  image: "string (URL)",
  stock: number
}
```

### Collection: `orders`

Cada documento contiene:

```javascript
{
  buyer: {
    firstName: "string",
    lastName: "string",
    phone: "string",
    email: "string",
    address: "string",
    city: "string",
    zipCode: "string"
  },
  items: [{
    id: "string",
    name: "string",
    price: number,
    quantity: number
  }],
  total: number,
  date: "ISO string",
  createdAt: "ISO string"
}
```

## Context API - CartContext

El contexto del carrito proporciona las siguientes funciones:

- `cart` - Array de productos en el carrito
- `addToCart(product, quantity)` - Agregar producto al carrito
- `removeFromCart(productId)` - Eliminar producto del carrito
- `updateQuantity(productId, newQuantity)` - Actualizar cantidad
- `clearCart()` - Vaciar el carrito
- `isInCart(productId)` - Verificar si un producto está en el carrito
- `getTotalQuantity()` - Obtener cantidad total de items
- `getTotalPrice()` - Obtener precio total
- `getProductQuantity(productId)` - Obtener cantidad de un producto específico

## Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## Deploy

- Vercel: https://react-proyecto-final-valenzuela.vercel.app/

## Variables de Entorno (Opcional)

Para mayor seguridad, puedes usar variables de entorno para las credenciales de Firebase:

1. Crea un archivo `.env` en la raíz:

```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

2. Actualiza `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

3. Agrega `.env` a `.gitignore`

## Autor

Proyecto desarrollado como entrega final del curso de React - CoderHouse. Alumna: Gabriela Valenzuela
