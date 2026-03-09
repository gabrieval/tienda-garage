import { collection, getDocs, getDoc, doc, query, where, addDoc } from "firebase/firestore";
import { db } from "./config";

// Obtener todos los productos o filtrar por categoría
export const getProducts = async (categoryId) => {
  try {
    const productsCollection = collection(db, "products");
    let q = productsCollection;

    if (categoryId) {
      q = query(productsCollection, where("category", "==", categoryId));
    }

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return products;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw error;
  }
};

// Obtener un producto por su ID
export const getProductById = async (productId) => {
  try {
    const productDoc = doc(db, "products", productId);
    const productSnapshot = await getDoc(productDoc);

    if (!productSnapshot.exists()) {
      throw new Error("Producto no encontrado");
    }

    return {
      id: productSnapshot.id,
      ...productSnapshot.data()
    };
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    throw error;
  }
};

// Obtener todas las categorías únicas
export const getCategories = async () => {
  try {
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);

    const categories = new Set();
    querySnapshot.docs.forEach(doc => {
      const category = doc.data().category;
      if (category) {
        categories.add(category);
      }
    });

    return Array.from(categories);
  } catch (error) {
    console.error("Error obteniendo categorías:", error);
    throw error;
  }
};

// Crear una orden de compra
export const createOrder = async (orderData) => {
  try {
    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, {
      ...orderData,
      createdAt: new Date().toISOString()
    });

    return docRef.id;
  } catch (error) {
    console.error("Error creando orden:", error);
    throw error;
  }
};
