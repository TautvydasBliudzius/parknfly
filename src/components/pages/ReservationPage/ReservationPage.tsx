import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { format, differenceInCalendarDays } from "date-fns";
import ReservationForm from "../../Forms/ReservationForm/ReservationForm";
import { createCustomer } from "../../api/customers";
import { createOccupancy } from "../../api/occupancy";
import "./ReservationPage.css"

interface ReservationPageProps { }

const ReservationPage: React.FC<ReservationPageProps> = () => {
  const location = useLocation();
  const parkingDate = location.state && location.state.parkingDate;
  const emptySpot = location.state && location.state.emptySpot;
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [carPlate, setCarPlate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [agreeWithRules, setAgreeWithRules] = useState(false);

  const goBack = () => {
    navigate("/");
  };

  const calculatePrice = (startDate: Date, endDate: Date): number => {
    const daysBooked = differenceInCalendarDays(endDate, startDate);
    if (daysBooked >= 8) {
      return daysBooked * 3; // 3 euros per day for 8 or more days
    } else if (daysBooked >= 4) {
      return daysBooked * 3.5; // 3.5 euros per day for 4-7 days
    } else {
      return daysBooked * 4; // 4 euros per day for 1-3 days
    }
  };

  const onSubmit = async () => {
    const customer = {
      spotId: emptySpot,
      name: name,
      carPlate,
      mobileNumber,
      email,
      price: calculatePrice(parkingDate[0].startDate, parkingDate[0].endDate).toString(),
      occupancy: [{ startDate: parkingDate[0].startDate, endDate: parkingDate[0].endDate }],
    };

    const occupancy = {
      startDate: parkingDate[0].startDate,
      endDate: parkingDate[0].endDate
    }

    try {
      await createCustomer(customer);
      await createOccupancy(emptySpot, occupancy)
      navigate("/success");
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div id="reservationPage">
      <div id="reservationContainer">
        <div>
          <h2>Rezervacijos informacija:</h2>
          <p>Jūsų pasirinktu laikotarpiu laisvų vietų aiktelėje yra</p>
          <div id="datesBox">
            <div>
              <h3>Atvykimo data:</h3>
              <div>{parkingDate && format(parkingDate[0].startDate, "yyyy-MM-dd")}</div>
            </div>
            <div>
              <h3>Išvykimo data:</h3>
              <div>{parkingDate && format(parkingDate[0].endDate, "yyyy-MM-dd")}</div>
            </div>
          </div>
          <div>
            <button onClick={goBack}>Keisti datas</button>
          </div>
          <div>
            <h4 id="price">
              {parkingDate &&
                "Suma: " +
                calculatePrice(
                  new Date(parkingDate[0].startDate),
                  new Date(parkingDate[0].endDate)
                )}
              €
            </h4>
          </div>
        </div>
        <div>
          <ReservationForm
            onSubmit={onSubmit}
            name={name}
            setName={setName}
            carPlate={carPlate}
            setCarPlate={setCarPlate}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            email={email}
            setEmail={setEmail}
            agreeWithRules={agreeWithRules}
            setAgreeWithRules={setAgreeWithRules}
          />
        </div>

        <button onClick={goBack}>Grįžti</button>
      </div>
    </div>
  );
};

export default ReservationPage;
