import './Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1">© 2026 CineApp</p>

        <div className="d-flex justify-content-center gap-3">
          <a href="#" className="text-light text-decoration-none">Inicio</a>
          <a href="#" className="text-light text-decoration-none">Sobre nosotros</a>
          <a href="#" className="text-light text-decoration-none">Contacto</a>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
