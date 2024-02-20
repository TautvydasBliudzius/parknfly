import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="contact-info">
          <h2>Kontaktai</h2>
          <p>Email: info@parknfly.lt</p>
          <p>Tel.Nr.: +123456789</p>
          <p>Adresas: Tulpių g. 20B, Karmėlava, Kauno raj.</p>
        </div>
        <div className="social-icons">
          <h2>Nuorodos</h2>
          <div className="icons">
    
          </div>
        </div>
        <div className="requisites">
          <h2>Rekvizitai</h2>
          <p>MB, Parkavimo Paslauga</p>
          <p>Įmonės kodas: 306671589</p>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2024 ParkNFly. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
