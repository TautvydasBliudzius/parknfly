import axios from "axios";

export const createOccupancy = async (occupancy, id) => {
    const response = await axios.post(`http://localhost:3000/spots/${id}/occupancy/`, occupancy);
    return response.data;
  };