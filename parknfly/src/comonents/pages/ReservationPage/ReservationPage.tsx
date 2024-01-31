import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSpots } from "../../api/spots";
import { format } from 'date-fns'

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

    const formattedStartDate = format(parkingDate[0].startDate, "dd/MM/yyyy");
    const formattedEndDate = format(parkingDate[0].endDate, "dd/MM/yyyy");
  

    const [dayS, monthS, yearS] = formattedStartDate.split("/");
    const [dayE, monthE, yearE] = formattedEndDate.split("/");

    const splitedStartDate = yearS + monthS + dayS
    const splitedEndDate = yearE + monthE + dayE
    console.log(splitedStartDate)
    console.log(splitedEndDate)



    const goBack = () => {
        navigate("/");
    }

    return (
        <div id="reservationPage">
            <h1>Reservation Page</h1>
            <div>
                {spots.map((spot) => (
                    <div key={spot._id}>{spot.occupancy}</div>
                ))}
            </div>

            <div>
                <div>from</div>
                <div>{parkingDate && format(parkingDate[0].startDate, "dd/MM/yyyy")}</div>
                <div>to</div>
                <div>{parkingDate && format(parkingDate[0].endDate, "dd/MM/yyyy")}</div>
                <div></div>
            </div>

            <button onClick={goBack}>grizti</button>
        </div>
    );
}

export default ReservationPage;
