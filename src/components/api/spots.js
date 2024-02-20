import axios from "axios";

export const getSpots = async () => {
  const response = await axios.get("http://localhost:3000/spots");
  return response.data;
};

export const createSpot = async (project) => {
  const response = await axios.post("http://localhost:3000/spots", project);
  return response.data;
};

export const deleteSpot = async (id) => {
  const response = await axios.delete(`http://localhost:3000/spots/${id}`);
  return response.data;
};
