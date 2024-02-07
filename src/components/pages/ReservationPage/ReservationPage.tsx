import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSpots } from "../../api/spots";
import { format, differenceInCalendarDays } from "date-fns";
import ReservationForm from "../../Forms/ReservationForm/ReservationForm";

interface Spot {
  _id: string;
  spotNr: string;
  occupancy: [];
}

const ReservationPage: React.FC = () => {
  const location = useLocation();
  const parkingDate = location.state && location.state.parkingDate;
  const navigate = useNavigate();
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    getSpots()
      .then((response) => {
        setSpots(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

  return (
    <div id="reservationPage">
      <h1>Reservation Page</h1>
      <div>
        {spots.map((spot) => (
          <div key={spot._id}>{spot.occupancy}</div>
        ))}
      </div>

      <div>
        <h2>Rezervacijos informacija:</h2>
        <h3>Atvykimo data:</h3>
        <div>
          {parkingDate && format(parkingDate[0].startDate, "yyyy-MM-dd")}
        </div>
        <h3>Išvykimo data:</h3>
        <div>{parkingDate && format(parkingDate[0].endDate, "yyyy-MM-dd")}</div>
        <div>
        <button onClick={goBack}>Keisti datas</button>
        </div>
        <div>
          <h3>Suma:</h3>
          <h4 id="price">
            {/* Calculate the price and display it */}
            {parkingDate &&
              calculatePrice(
                new Date(parkingDate[0].startDate),
                new Date(parkingDate[0].endDate)
              )}
            euros
          </h4>
        </div>
      </div>
      <div>
        <ReservationForm/>
      </div>

      <button onClick={goBack}>grizti</button>
    </div>
  );
};

export default ReservationPage;
