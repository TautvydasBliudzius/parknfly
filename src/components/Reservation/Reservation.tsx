import React, { useState, useEffect } from "react";
import { DateRange } from 'react-date-range';
import { format, isWithinInterval } from 'date-fns'
import { useNavigate } from "react-router-dom";
import { getSpots } from "../api/spots";
import { create } from "zustand";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Spot {
  _id: string;
  spotNr: string;
  occupancies: Occupancy[];
}

interface Occupancy {
  startDate: Date;
  endDate: Date;
  _id: string;
}

const Reservation: React.FC = () => {
  const [openDate, setOpenDate] = useState(false);
  const [parkingDate, setParkingDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    } as any
  ]);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [isSpotFree, setIsSpotFree] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getSpots()
      .then((response) => {
        setSpots(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);




  const onSubmit = () => {

    const selectedStartDate: Date = parkingDate[0].startDate;
    const selectedEndDate: Date = parkingDate[0].endDate;

    // await createOccupancy(spotId, { startDate: selectedStartDate, endDate: selectedEndDate })

    const firstFreeSpot = spots.find((spot) =>
      !spot.occupancies.some(({ startDate, endDate }) =>
        isWithinInterval(selectedStartDate, { start: new Date(startDate), end: new Date(endDate) }) ||
        isWithinInterval(selectedEndDate, { start: new Date(startDate), end: new Date(endDate) })
      )
    );

    if (firstFreeSpot) {
      setIsSpotFree(true)
      navigate("/reservationPage", { state: { parkingDate } });
      sessionStorage.setItem("startDate", JSON.stringify(selectedStartDate));
      sessionStorage.setItem("endDate", JSON.stringify(selectedEndDate));
    }
    else {
      setIsSpotFree(false)
    }
  };


  return (
    <div id="reservation">
      {isSpotFree ? (
        <>
          <div className="headerDateInput">
            <span onClick={() => setOpenDate(!openDate)} className="headerDateInputText">Automobilio parkavimo laikotarpis</span>
            {openDate && <DateRange
              editableDateInputs={true}
              onChange={item => setParkingDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={parkingDate}
              className="dateInput"
            />}
          </div>
          <div>
            <div>from</div>
            <div>{`${format(parkingDate[0].startDate, "dd/MM/yyyy")}`}</div>
            <div>to</div>
            <div>{`${format(parkingDate[0].endDate, "dd/MM/yyyy")}`}</div>
          </div>
          <button type="submit" onClick={onSubmit}>Tikrinti</button>
        </>
      ) : (
        <>
          <div className="headerDateInput">
            <span onClick={() => setOpenDate(!openDate)} className="headerDateInputText">Automobilio parkavimo laikotarpis</span>
            {openDate && <DateRange
              editableDateInputs={true}
              onChange={item => setParkingDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={parkingDate}
              className="dateInput"
            />}
          </div>
          <div>
            <div>from</div>
            <div>{`${format(parkingDate[0].startDate, "dd/MM/yyyy")}`}</div>
            <div>to</div>
            <div>{`${format(parkingDate[0].endDate, "dd/MM/yyyy")}`}</div>
          </div>
          <h2>Pasirinktomis dienomis laivų vietų nėra</h2>
          <button type="submit" onClick={onSubmit}>Tikrinti</button>
        </>
      )}
    </div>
  );
}

export default Reservation;
