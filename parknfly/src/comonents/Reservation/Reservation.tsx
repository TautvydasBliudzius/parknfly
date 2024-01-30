import React, { useState } from "react";
import { DateRange } from 'react-date-range';
import {format} from 'date-fns'
import { useNavigate } from "react-router-dom";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Reservation: React.FC= () => {
  const [openDate, setOpenDate] = useState(false)
 const [parkingDate, setParkingDate] = useState([
  {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }as any
 ])

 const navigate = useNavigate()

 const onSubmit = () => {
  navigate("/reservationPage")
 }

  return (
    <div id="reservation">
      <div className="headerDateInput">
        <span onClick={() => setOpenDate(!openDate)} className="headerDateInputText">Automobilio parkavimo laikotarpis</span>
        {openDate && <DateRange
        editableDateInputs={true}
        onChange={item=>setParkingDate([item.selection])}
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
    </div>
  );
}

export default Reservation;
