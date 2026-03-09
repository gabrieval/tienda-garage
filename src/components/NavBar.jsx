import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { getCategories } from "../firebase/services";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const formatCategoryName = (category) => {
    return category
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" alt="logo" width="150" height="auto" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="categoriasDropdown"
                type="button"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Categorías
              </button>
              <ul
                className={`dropdown-menu${isDropdownOpen ? " show" : ""}`}
                aria-labelledby="categoriasDropdown"
                style={{ display: isDropdownOpen ? "block" : "none" }}
              >
                <li>
                  <Link className="dropdown-item" to="/" onClick={closeDropdown}>
                    Todos los Productos
                  </Link>
                </li>
                {categories.map(category => (
                  <li key={category}>
                    <Link
                      className="dropdown-item"
                      to={`/category/${category}`}
                      onClick={closeDropdown}
                    >
                      {formatCategoryName(category)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item ms-3">
              <CartWidget />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
