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
  startDate: string;
  endDate: string;
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
    const hasOverlap = spots.some(spot => {
      return spot.occupancy.some(({ startDate, endDate }) => {
        const selectedStartDate = parkingDate[0].startDate;
        const selectedEndDate = parkingDate[0].endDate;
        const spotStartDate = new Date(startDate);
        const spotEndDate = new Date(endDate);
        console.log(selectedStartDate + " selected")
        console.log(spotStartDate + " interval start")
        console.log(spotEndDate + " interval end")
        console.log(isWithinInterval(selectedStartDate, { start: spotStartDate, end: spotEndDate }) )
        console.log(isWithinInterval(selectedEndDate, { start: spotStartDate, end: spotEndDate }))
        return (
          isWithinInterval(selectedStartDate, { start: spotStartDate, end: spotEndDate }) ||
          isWithinInterval(selectedEndDate, { start: spotStartDate, end: spotEndDate })
        );
      });
    }); 
    setIsSpotFree(!hasOverlap);
  
    if (!hasOverlap) {
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
