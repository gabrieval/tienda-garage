import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="home-link">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
