import React from "react";
import FormInput from "../FormInput/FormInput";
import './ReservationForm.css'

interface ReservationFormProps {
  onSubmit: () => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  carPlate: string;
  setCarPlate: React.Dispatch<React.SetStateAction<string>>;
  mobileNumber: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  agreeWithRules: boolean;
  setAgreeWithRules: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  onSubmit,
  name,
  setName,
  carPlate,
  setCarPlate,
  mobileNumber,
  setMobileNumber,
  email,
  setEmail,
  agreeWithRules,
  setAgreeWithRules,
}) => {

  const navigateToRules = () => {
    window.open("/rules");
  };

  return (
    <div id="reservationForm">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} id="orderForm">
      <FormInput
          label="Vardas:"
          placeholder="Vardas"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          label="Automobilio valstybinis numeris:"
          placeholder="AAA000"
          type="text"
          value={carPlate}
          onChange={(e) => setCarPlate(e.target.value)}
        />
        <FormInput
          label="Tel. Nr.:"
          placeholder="+370"
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <FormInput
          label="El. pašto adresas:"
          placeholder="info@parknfly.lt"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="agreeWithRulesLabel">
          Sutinku su
          <a onClick={navigateToRules}>taisyklėmis</a>
        </label>
        <input
          type="checkbox"
          id="agreeWithRules"
          checked={agreeWithRules}
          onChange={(e) => setAgreeWithRules(e.target.checked)}
        />
        <br />
        <button type="submit">Rezervuoti</button>
      </form>
    </div>
  );
};

export default ReservationForm;
