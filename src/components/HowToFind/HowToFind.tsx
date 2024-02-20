import React from "react";
import "./HowToFind.css";

interface HowToFindProps {}

const HowToFind: React.FC<HowToFindProps> = () => {
  const address = "Tulpių g. 20B";
  const latitude = 54.96800091537007; 
  const longitude = 24.064404757448603;

  const handleGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`);
  };

  const handleWaze = () => {
    window.open(`https://www.waze.com/ul?ll=${latitude},${longitude}`);
  };

  return (
    <div id="howtofind">
      <h1>Kaip mus rasti</h1>
      <div className="map-container">
        <iframe
          title="Google Maps"
          className="google-map"
          src={`https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=YOUR_API_KEY`}
          allowFullScreen
        ></iframe>
        <div className="directions">
          <p>
            Aikštelės adresas:<strong>{address}</strong>
          </p>
          <p>
            Nuorodos:
            <img onClick={handleGoogleMaps} src="../../images/googlemapsicon.png" alt="Google navigation" />            
            <img onClick={handleWaze} src="../../images/wazeicon.jpg" alt="waze navigation" />
          </p>
          <p>
            Aprašymas kaip mus rasti
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToFind;
