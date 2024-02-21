import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getSpots, createSpot, deleteSpot } from "../../api/spots";
import { format, isWithinInterval } from 'date-fns'
import { DateRange } from 'react-date-range';
import './AdminMenu.css'
import lt from 'date-fns/locale/lt';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface Spot {
  _id: string;
  spotNr: string;
  occupancies: {
    startDate: Date;
    endDate: Date;
  }[];
}

interface Customer {
  _id: string;
  spotId: string;
  name: string;
  carPlate: string;
  mobileNumber: string;
  email: string;
  price: string;
  occupancy: {
    startDate: Date;
    endDate: Date;
  }[];
}

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["access_token"]);
  const [spots, setSpots] = useState<Spot[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isSpotsOpen, setSpotsOpen] = useState(false)
  const [openDate, setOpenDate] = useState(false);
  const [availableSpotCount, setAvailableSpotCount] = useState<number>(0);
  const [parkingDate, setParkingDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    } as any
  ]);


  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = cookies.access_token;
        if (token) {
          setIsLoggedIn(true);
        } else {
          navigate("/admin/login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        navigate("/admin/login");
      }
    };
    checkToken();

    const fetchData = async () => {
      try {
        const response = await getSpots();
        setSpots(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [cookies, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  const checkOccupanciesAccordanceToDate = () => {
    const selectedStartDate: Date = parkingDate[0].startDate;
    const selectedEndDate: Date = parkingDate[0].endDate;
  
    const count = spots.reduce((count, spot) => {
      const isOccupied = spot.occupancies.some(({ startDate, endDate }) =>
        isWithinInterval(selectedStartDate, { start: new Date(startDate), end: new Date(endDate) }) ||
        isWithinInterval(selectedEndDate, { start: new Date(startDate), end: new Date(endDate) })
      );
      if (!isOccupied) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);
    setAvailableSpotCount(count);
  }
  

  const handleLogOut = () => {
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + 1);
    setCookie('access_token', "", { expires: expirationDate });
    setIsLoggedIn(false);
    navigate("/");
  }

  const createNewSpot = async () => {
    try {
      const newSpot = {
        occupancies: []
      };
      const response = await createSpot(newSpot);
      console.log("spot creates successfully" , newSpot)
      setSpots([...spots, response]);
    } catch (error) {
      console.error(error);
    }
  };

  // const createCustomer = async () => {
  //   try {
  //     // const newCustomer = {
  //     //   spotId: string;
  //     //   name: string;
  //     //   carPlate: string;
  //     //   mobileNumber: string;
  //     //   email: string;
  //     //   price: string;
  //     //   occupancy: {
  //     //     startDate: Date;
  //     //     endDate: Date;
  //     //   }[];
  //     // };
  //     const response = await createSpot(newCustomer);
  //     console.log("Customer creates successfully" , newCustomer)
  //     setSpots([...spots, response]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const spotDelete = async (spotId: string) => {
    try {
      await deleteSpot(spotId)
      const updatedPostsList = await getSpots();
        setSpots(updatedPostsList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Menu</h1>
      <div>Viso aktyvių parkavimo vietų: {spots.length}</div>
      <button onClick={() => setSpotsOpen(!isSpotsOpen)}>
        Peržiūrėti visų stovėjimo vietų užimtumus
      </button>
      {isSpotsOpen && (
        <>
          {spots.map(spot => (
            <div key={spot._id}>
              <h5>Spot id. {spot._id}</h5>
              <p>Vietos užimtumas:</p>
              {spot.occupancies && spot.occupancies.length > 0 ? (
              <ul>
                {spot.occupancies.map((occupancy, index) => (
                  <li key={index} className="occupancyDates">
                    <div>Nuo: {`${format(occupancy.startDate, "yyyy-MM-dd")}`}</div>
                    <div>Iki: {`${format(occupancy.endDate, "yyyy-MM-dd")}`}</div>
                  </li>
                ))}
              </ul>
              ) : (
              <div>Rezervuotų dienų nėra</div>
              )}
              
              <button onClick={() => {spotDelete(spot._id  )}}>Pašalinti parkavimo vietą</button>
            </div>
          ))}
          <button onClick={() => {createNewSpot()}}>Pridėti parkavimo vietą</button>
        </>
      )}
      <br/>
      <button onClick={() => {setOpenDate(!openDate);}}>Tikrinti laisvų vietų skaičių konkrečiomis dienomis</button>
      <div className="dateRangeBox" >
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setParkingDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={parkingDate}
                  className="dateInput"
                  locale={lt}
                />
              )}
            </div>
      <br/>
      <div>
            <div>
              <div >Atvykimo data</div>
              <div>{`${format(parkingDate[0].startDate, "yyyy-MM-dd")}`}</div>
            </div>

            <div>
              <div>Išvykimo data</div>
              <div>{`${format(parkingDate[0].endDate, "yyyy-MM-dd")}`}</div>
            </div>
          </div>
      <br/>
      <button onClick={() => {checkOccupanciesAccordanceToDate()}}>Tikrinti laisvų vietų skaičių</button>
      <div>Laisvų vietų skaičius pasirinktu laikotarpiu: {availableSpotCount}</div>
      <br/>
      {/* <button onClick={() => {createCustomer()}}>Sukurti naują klientą</button> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <button onClick={() => handleLogOut()}>LogOut</button>
    </div>
  );
};

export default AdminMenu;
