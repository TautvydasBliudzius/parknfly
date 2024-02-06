import React, { useState, useEffect } from "react";
import { DateRange } from 'react-date-range';
import { format, isWithinInterval } from 'date-fns'
import { useNavigate } from "react-router-dom";
import { getSpots } from "../api/spots";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Spot {
  _id: string;
  spotNr: string;
  occupancy: Occupancy[];
}

interface Occupancy {
  startDate: Date;
  endDate: Date;
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
  const [isSpotFree, setIsSpotFree] = useState(false);
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
    if (spots.length === 0) {
      console.error("No spots available.");
      return;
    }

    const spotId = spots[0]._id; 


    console.log(spots);
    const selectedStartDate: Date = parkingDate[0].startDate;
    const selectedEndDate: Date = parkingDate[0].endDate;
    const dbStartDate = spots[0].occupancy[0].startDate
    // console.log(typeof(dbStartDate))
    console.log(typeof (selectedEndDate))
    console.log(selectedStartDate)
    // console.log(dbStartDate)  
    const firstFreeSpot = spots.find((spot) =>
      spot.occupancy.find(({ startDate, endDate }: Occupancy) =>
        !isWithinInterval(selectedStartDate, {
          start: new Date(2024, 0, 28),
          end: new Date(2024, 1, 2),
        }) &&
        !isWithinInterval(selectedEndDate, {
          start: new Date(2024, 0, 28),
          end: new Date(2024, 1, 2),
        })
      )
    );

    console.log(firstFreeSpot);

    if (firstFreeSpot) {
      console.log("navigate");
      // navigate("/reservationPage", { state: { parkingDate } });
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
