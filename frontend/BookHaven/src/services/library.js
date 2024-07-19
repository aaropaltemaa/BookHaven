import axios from "axios";

const baseLibraryUrl = "http://localhost:3001/api/library";

const getUserBooks = async (userId) => {
  const response = await axios.get(`${baseLibraryUrl}/${userId}`);
  return response.data;
};

export default { getUserBooks };
