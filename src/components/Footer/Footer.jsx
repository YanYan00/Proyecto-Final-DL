import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <p>Correo: jean.rojas@usach.cl</p>
                    <p>Teléfono: +56 9 59241438</p>
                </div>
                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>
                </div>
                <div className="footer-section">
                    <h4>Información</h4>
                    <p>© {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;