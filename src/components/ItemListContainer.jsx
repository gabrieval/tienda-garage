import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { getProducts } from "../firebase/services";

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts(categoryId).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [categoryId]);

  return (
    <div className="item-list-container">
      <h1>
        {categoryId
          ? `Categoría: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`
          : "Todos los Productos"}
      </h1>
      {loading ? <p>Cargando productos...</p> : <ItemList products={products} />}
    </div>
  );
};

export default ItemListContainer;
