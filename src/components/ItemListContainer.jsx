import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { getProducts } from "../firebase/services";

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    getProducts(categoryId).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [categoryId]);

  const filteredProducts = useMemo(() => {
    if (categoryId) return products;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const name = String(p.name ?? "").toLowerCase();
      const description = String(p.description ?? "").toLowerCase();
      return name.includes(q) || description.includes(q);
    });
  }, [products, searchQuery, categoryId]);

  const listEmptyMessage =
    !categoryId &&
    !loading &&
    products.length > 0 &&
    filteredProducts.length === 0 &&
    searchQuery.trim()
      ? "No encontramos productos que coincidan con tu búsqueda."
      : undefined;

  return (
    <div className="item-list-container">
      <h1>
        {categoryId
          ? `Categoría: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`
          : "Todos los Productos"}
      </h1>
      {!categoryId && (
        <div className="product-search">
          <label className="product-search-label" htmlFor="product-search-input">
            Buscar productos
          </label>
          <input
            id="product-search-input"
            type="search"
            className="form-control product-search-input"
            placeholder="Nombre o descripción…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
      )}
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ItemList products={filteredProducts} emptyMessage={listEmptyMessage} />
      )}
    </div>
  );
};

export default ItemListContainer;
