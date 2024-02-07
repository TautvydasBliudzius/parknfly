import axios from "axios";

export const createOccupancy = async (spotid, occupancy) => {
  const response = await axios.put(
    `http://localhost:3000/spots/${spotid}`,
    occupancy
  );
  return response.data;
};

export const deleteOccupancy = async (spotId, occupancyId) => {
  const response = await axios.delete(`http://localhost:3000/spots/:${spotId}/occupancies/:${occupancyId}`);
  return response.data;
};