import axios from "axios";

const baseUrl = "/api/users";

const registerUser = async (details) => {
  let response = await axios.post(baseUrl, details);
  return response.data;
};

let registerService = { registerUser };

export default registerService;
