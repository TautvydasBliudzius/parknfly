import React from "react";
import { useNavigate } from "react-router-dom";



const Rules: React.FC = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/")
    }
  return (
    <div id="rules">
        <h1>Rules</h1>
        <button onClick={goBack}>Grįžti į pagrindinį</button>
    </div>
  );
}

export default Rules;
