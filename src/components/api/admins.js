import axios from "axios";

export const getAdmins = async () => {
  const response = await axios.get("http://localhost:3000/admins");
  return response.data;
};


