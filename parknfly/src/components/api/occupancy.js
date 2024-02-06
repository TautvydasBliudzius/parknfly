import axios from "axios";

export const updateOccupancy = async (spot) => {
  const response = await axios.put(
    `http://localhost:3000/spots/${spot._id}`,
    spot
  );
  return response.data;
};