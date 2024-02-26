import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";



const Rules: React.FC = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/reservationPage")
    }
  return (
    <div id="rules">
        <NavBar />
        <h3>Rezervacija atlikta sėkmingai</h3>
        <h2>Lauksime atvykstant!</h2>
        <button onClick={goBack}>Kaip mus rasti?</button>
    </div>
  );
}

export default Rules;
