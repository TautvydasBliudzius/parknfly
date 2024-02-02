import axios from "axios";

export const getSpots = async () => {
  const response = await axios.get("http://localhost:3000/spots");
  return response.data;
};


