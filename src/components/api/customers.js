import axios from "axios";

export const getCustomers = async () => {
  const response = await axios.get("http://localhost:3000/customers");
  return response.data;
};

export const getCustomer = async (id) => {
  const response = await axios.get(`http://localhost:3000/customers/${id}`);
  return response.data;
};

export const createCustomer = async (project) => {
  const response = await axios.post("http://localhost:3000/customers", project);
  return response.data;
};

export const updateCustomer = async (project) => {
  const response = await axios.put(
    `http://localhost:3000/customers/edit/${project.id}`,
    project
  );
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axios.delete(`http://localhost:3000/customers/${id}`);
  return response.data;
};