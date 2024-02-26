import React, { useState, useEffect, useRef } from "react";
import { DateRange } from 'react-date-range';
import { format, isWithinInterval, differenceInCalendarDays } from 'date-fns'
import { useNavigate } from "react-router-dom";
import { getSpots } from "../api/spots";
import lt from 'date-fns/locale/lt';

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
  const [selectedDays, setIsSelectedMoreThan1Days] = useState(true)
  const navigate = useNavigate();
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const [emptySpot, setEmptySpot] = useState("")

  useEffect(() => {
    getSpots()
      .then((response) => {
        setSpots(response);
      })
      .catch((error) => {
        console.error(error);
      });

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    if ((dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node))) {
      setOpenDate(false);
    }
  };

  const onSubmit = () => {
    const selectedStartDate: Date = parkingDate[0].startDate;
    const selectedEndDate: Date = parkingDate[0].endDate;
    const diffInDays = differenceInCalendarDays(selectedEndDate, selectedStartDate);
    const firstFreeSpot = spots.find((spot) =>
      !spot.occupancies.some(({ startDate, endDate }) =>
        isWithinInterval(selectedStartDate, { start: new Date(startDate), end: new Date(endDate) }) ||
        isWithinInterval(selectedEndDate, { start: new Date(startDate), end: new Date(endDate) })
      )
    );

    

    if (firstFreeSpot && diffInDays >= 1) {
      setIsSpotFree(true)
      setEmptySpot(firstFreeSpot._id)
      navigate("/reservationPage", { state: { parkingDate, emptySpot: firstFreeSpot._id } });
      sessionStorage.setItem("startDate", JSON.stringify(selectedStartDate));
      sessionStorage.setItem("endDate", JSON.stringify(selectedEndDate));
    }
    else {
      if(!(diffInDays >= 1)) {
        setIsSelectedMoreThan1Days(false)
      }
      else {
      setIsSelectedMoreThan1Days(true)
      setIsSpotFree(false)
      }
    }
  };


  return (
    <div id="reservation">
      <div id="reservationBox">
        <div className="dateRangeContainer">
          <div ref={dateRangeRef}>
            <button
              onClick={() => {
                setOpenDate(!openDate);
              }}
              className="headerDateInputText"
            >
              Pasirinkti automobilio stovėjimo laikotarpį
            </button>

            <div className="dateRangeBox" >
              {openDate && (
                <DateRange
                editableDateInputs={true}
                onChange={item => setParkingDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={parkingDate}
                className="dateInput"
                locale={lt}
                minDate={new Date()}
                />
              )}
            </div>
          </div>

          <div className="dateBoxContainer">
            <div className="dateBox">
              <div className="dateBoxTitle">Atvykimo data</div>
              <div>{`${format(parkingDate[0].startDate, "yyyy-MM-dd")}`}</div>
            </div>

            <div className="dateBox">
              <div className="dateBoxTitle">Išvykimo data</div>
              <div>{`${format(parkingDate[0].endDate, "yyyy-MM-dd")}`}</div>
            </div>
          </div>

          <button type="submit" onClick={onSubmit} className="checkButton">Tikrinti užimtumą</button>

        </div>
        {!isSpotFree ? (<div className="noSpotsError">Apgailestaujame, pasirinktomis dienomis laisvų vietų nėra</div>) : (<div></div>)}
        {!selectedDays ? (<div className="noSpotsError">Norint atlikti rezervaciją reikia pasirinkti bent 2 dienas</div>) : (<div></div>)}        
      </div>
    </div>
  );
}

export default Reservation;
