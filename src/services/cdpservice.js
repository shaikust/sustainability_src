// import axios from 'axios';

import axios from "axios";

const BASE_URL = 'http://localhost:8080'; 
export const getCdpDataService = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/supplier/reporting/cdpdetails`);
    return response.data;
  } catch (error) {
    throw error;
  }
};