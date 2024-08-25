import axios from 'axios';

const API_URL = 'https://uat-mysiloam-api.siloamhospitals.com/api/v2/hospitals';

export const fetchItems = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data.data;
};

export const fetchItemById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const storeUpdatedItemData = (updatedItem) => {
  const updatedItemJson = JSON.stringify(updatedItem);
  sessionStorage.setItem('updatedItemData', updatedItemJson);
};