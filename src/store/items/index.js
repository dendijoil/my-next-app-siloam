import axios from "axios";

export const fetchItems = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  return response.data.data;
};

export const storeUpdatedItemData = (updatedItem) => {
  const updatedItemJson = JSON.stringify(updatedItem);
  sessionStorage.setItem("updatedItemData", updatedItemJson);
};
