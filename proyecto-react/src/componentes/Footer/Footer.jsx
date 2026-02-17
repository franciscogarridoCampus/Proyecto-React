import './Footer.css';

function Footer() {
    return (
        <footer className="bg-dark text-white pt-4 pb-2 mt-auto border-top border-primary">
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <h5>Contacto Cine-App</h5>
                        <p className="small mb-0"> info@cineapp.com</p>
                        <p className="small"> +34 600 000 000</p>
                    </div>
                    <div className="col-md-6 mb-3">
                        <h5>Ubicación</h5>
                        <p className="small">Av. del Cine, 123, Sevilla, España</p>
                    </div>
                </div>
                <hr className="bg-light" />
                <p className="small mb-0">© 2026 CineApp Pro - Proyecto React</p>
            </div>
        </footer>
    );
}
export { Footer };