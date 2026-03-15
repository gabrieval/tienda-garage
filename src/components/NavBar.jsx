import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import { getCategories } from "../firebase/services";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
          <img src="/logo.png" alt="Venta de Garaje" width="150" height="auto" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobileMenu}
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse${isMobileMenuOpen ? " show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMobileMenu}>
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
                  <Link className="dropdown-item" to="/" onClick={closeMobileMenu}>
                    Todos los Productos
                  </Link>
                </li>
                {categories.map(category => (
                  <li key={category}>
                    <Link
                      className="dropdown-item"
                      to={`/category/${category}`}
                      onClick={closeMobileMenu}
                    >
                      {formatCategoryName(category)}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item ms-3" onClick={closeMobileMenu}>
              <CartWidget />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
