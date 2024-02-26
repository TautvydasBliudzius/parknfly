import React from "react";
import wazeIcon from '../../images/wazeicon.jpg'
import googleMapsIcon from '../../images/googlemapsicon.png'
import locationIcon from '../../images/location.png'
import "./HowToFind.css";

interface HowToFindProps { }

const HowToFind: React.FC<HowToFindProps> = () => {
  const address = "Tulpių g. 20B";
  const latitude = 54.96814407208941;
  const longitude = 24.06454444182053;

  const handleGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`);
  };

  const handleWaze = () => {
    window.open(`https://www.waze.com/ul?ll=${latitude},${longitude}`);
  };

  return (
    <div id="howtofind">
      <div className="navigationsContainer">
        <div>
          <div className="flexRow">
            <img className="navIcon" src={locationIcon} alt="location Icon" />
            <div>Tulpių g. 20B, Karmėlava, Kauno rajonas</div>
          </div>
          <div>Automobilių parkavimo aikštelė prie Kauno oro uosto.  Atstumas iki oro uosto – 800 m. Teritorija apšviesta, stebima vaizdo kameromis.</div>
        </div>
        <div id="navigationIconsContainer">
          <div className="flexRow">
            <img className="navIcon" onClick={handleGoogleMaps} src={googleMapsIcon} alt="Google navigation" />
            <div>Google Maps navigacija</div>
          </div>
          <div className="flexRow">
            <img className="navIcon" onClick={handleWaze} src={wazeIcon} alt="waze navigation" />
            <div>Waze navigacija</div>
          </div>
        </div>
      </div>


      <div className="map-container">
        <iframe
          title="Google Maps"
          className="google-map"
          src={`https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=AIzaSyA5NKtZFkNxzDO75yL5NouClTq1K_VvIPQ`}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default HowToFind;
