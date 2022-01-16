import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.headers.common = {
  Authorization: localStorage.getItem("token")
    ? `bearer ${localStorage.getItem("token")}`
    : null,
};
export default axios;
