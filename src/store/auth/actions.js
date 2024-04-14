import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;
let prefix = "/api";
const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

export const login = async ({ commit }, payload) => {
  let res = {};
  try {
    res = await axios({
      method: "post",
      url: `${API_BASE_URL}${prefix}/auth/login`,
      data: payload,
      headers: headers,
    });
  } catch (e) {
    // // console.log(e);
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
};
