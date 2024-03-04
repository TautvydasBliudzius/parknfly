import React from "react";
import { useNavigate } from "react-router-dom";
import './SuccessReservation.css'

const Rules: React.FC = () => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate("/")
  }
  return (
    <div id="successReservation">
      <div id="successMessageContainer">
        <h3>Rezervacija atlikta sėkmingai</h3>
        <h2>Lauksime atvykstant!</h2>
        <button onClick={goBack}>Į pradžią</button>
      </div>
    </div>
  );
}

export default Rules;
