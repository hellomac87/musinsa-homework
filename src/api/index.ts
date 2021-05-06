import axios from "axios";

const baseURL = "https://www.anapioficeandfire.com/api";

const apiClient = axios.create({
  baseURL,
});

export default apiClient;
