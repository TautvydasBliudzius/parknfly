import React from "react";
import FormInput from "../FormInput/FormInput";
import { useNavigate } from "react-router-dom";


interface ReservationFormProps { }

const ReservationForm: React.FC<ReservationFormProps> = () => {

    const navigate = useNavigate();

    const navigateToRules = () => {
        window.open("/rules");
    }



    return (
        <div id="reservationForm">
            <form action="lt/order" id="orderForm">
                <FormInput label="Automobilio valstybinis numeris:" placeholder="AAA000" type="text"/>
                <FormInput label="Tel. Nr.:" placeholder="+370" type="text"/>
                <FormInput label="El. pašto adresas:" placeholder="info@parknfly.lt" type="email"/>
                <label className="agreeWithRulesLaber">Sutinku su</label>
                <a onClick={navigateToRules}>taisyklėmis</a>
                <input type="checkbox" id="agreeWithRules"/>
            </form>
        </div>
    );
}

export default ReservationForm;
