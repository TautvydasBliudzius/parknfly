import React, { useState, useEffect } from "react";
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
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
    
    const hasOverlap = spots.every(spot => {
      return spot.occupancy.some(({ startDate, endDate }) => {
        const formattedSelectedStartDate = format(parkingDate[0].startDate, "dd/MM/yyyy");
        const formattedSelectedEndDate = format(parkingDate[0].endDate, "dd/MM/yyyy");
  
        const [dayS, monthS, yearS] = formattedSelectedStartDate.split("/");
        const [dayE, monthE, yearE] = formattedSelectedEndDate.split("/");

        const [dbDayS, dbMonthS, dbYearS] = startDate.split("/");
        const [dbDayE, dbMonthE, dbYearE] = endDate.split("/");
    
        const splitedSelectedStartDate = yearS + monthS + dayS
        const splitedSelectedEndDate = yearE + monthE + dayE

        const splitedDbStartDate = dbYearS + dbMonthS + dbDayS
        const splitedDbEndDate = dbYearE + dbMonthE + dbDayE
        console.log(splitedSelectedStartDate + " s start")
        console.log(splitedSelectedEndDate + " s end")
        console.log(splitedDbStartDate + " d start")
        console.log(splitedDbEndDate + " d end")
        return (
          (splitedSelectedStartDate <= splitedDbEndDate && splitedSelectedEndDate >= splitedDbStartDate) || 
          (splitedSelectedEndDate >= splitedDbStartDate && splitedSelectedEndDate <= splitedDbEndDate) || 
          (splitedSelectedStartDate >= splitedDbStartDate && splitedSelectedStartDate <= splitedDbEndDate) ||
          (splitedSelectedStartDate === splitedDbStartDate) || (splitedSelectedStartDate == splitedDbEndDate) ||
          (splitedSelectedEndDate === splitedDbStartDate) || (splitedSelectedEndDate === splitedDbEndDate)
        );
      });
    });
  
    setIsSpotFree(!hasOverlap);
    if (!hasOverlap) {
      console.log("navigate")
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
