import React from "react";
import { useNavigate } from "react-router-dom";



const Rules: React.FC = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/reservationPage")
    }
  return (
    <div id="rules">
        <h1>Rules</h1>
        <button onClick={goBack}>grizti</button>
    </div>
  );
}

export default Rules;
