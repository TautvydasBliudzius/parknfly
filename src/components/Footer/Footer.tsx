import React from "react";
import { FaWaze } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <div className="footerContent">
        <div>
          <ul>
            <li><h4>Kontaktai</h4></li>
            <li><FaPhone/>+37063105725</li>
            <li><MdEmail/>info@parknfly.lt</li>
          </ul>
        </div>

        <ul className="social-icon">
          <li className="social-icon__item">
            <div className="social-icon__link" onClick={handleGoogleMaps}>
              <SiGooglemaps />
            </div>
          </li>
          <li className="social-icon__item">
            <div className="social-icon__link" onClick={handleWaze}>
              <FaWaze />
            </div>
          </li>
        </ul>

        <div>
          <ul>
            <li>Rekvizitai</li>
            <li>Parkavimo paslauga, MB</li>
            <li>Įmonės kodas: 306671589</li>
            <li></li>
          </ul>
        </div>
      </div>


      <p>&copy;2024 ParkNFly | All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
