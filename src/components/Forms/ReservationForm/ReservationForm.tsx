import React, { useState } from "react";
import FormInput from "../FormInput/FormInput";
import PhoneInput from 'react-phone-number-input'
import Modal from "../../modal/Modal"
import 'react-phone-number-input/style.css'
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

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const namePattern = /^[A-Za-z0-9]{3,16}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const carPlatePattern = /^[a-zA-Z0-9]{1,8}$/

  return (
    <div id="reservationForm">
      <div id="formContainer">
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} id="orderForm">
          <FormInput
            className="textInput"
            label="Vardas:"
            placeholder="Vardas"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            pattern={namePattern.source}
            title="Name should be 3-16 characters and shouldn't include any special character!"
            required
          />
          <FormInput
            label="Automobilio valstybinis numeris:"
            className="textInput"
            placeholder="AAA000"
            type="text"
            value={carPlate}
            onChange={(e) => setCarPlate(e.target.value)}
            pattern={carPlatePattern.source}
            title="Input shouldn't include any special character!"
            required
          />
          <PhoneInput
            style={{ marginBottom: "1rem" }}
            international
            defaultCountry="LT"
            placeholder="Enter phone number"
            value={mobileNumber}
            onChange={(value: string | undefined) => {
              if (value && /^\+[0-9]{7,15}$/.test(value)) {
                setMobileNumber(value);
              }
            }}
            required
          />

          <FormInput
            label="El. pašto adresas:"
            className="textInput"
            placeholder="info@parknfly.lt"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern={emailPattern.source}
            title="It should be a valid email address!"
            required
          />
          <div className="flexRow">
            <label className="agreeWithRulesLabel">
              Sutinku su
              <a onClick={toggleModal}> taisyklėmis</a>
              {showModal && <Modal showModal={showModal} onClose={toggleModal} />}
            </label>
            <input
              type="checkbox"
              id="agreeWithRules"
              checked={agreeWithRules}
              onChange={(e) => setAgreeWithRules(e.target.checked)}
              required
            />
          </div>
          <br />
          <button type="submit">Rezervuoti</button>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;