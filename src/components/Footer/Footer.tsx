import React from "react";
import WazeIcon from "../../images/wazeiconBlue.png"
import GoogleMapsIcon from "../../images/googlemapsicon.png"
import "./Footer.css";

const Footer: React.FC = () => {
  const latitude = 54.96814407208941;
  const longitude = 24.06454444182053;

  const handleGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`);
  };

  const handleWaze = () => {
    window.open(`https://www.waze.com/ul?ll=${latitude},${longitude}`);
  };

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
          <div className="footerIcons">
            <img className="navIconFooterGoogle" onClick={handleGoogleMaps} src={GoogleMapsIcon} alt="Google navigation" />
            <img className="navIconFooterWaze" onClick={handleWaze} src={WazeIcon} alt="waze navigation" />
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
