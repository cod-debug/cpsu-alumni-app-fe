import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;
let prefix = "api";

let headers = {
  "Content-Type": "application/json; charset=utf-8",
};

export const getAlumniList = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "get",
      url: `${API_BASE_URL}/${prefix}/users/list`,
      params: payload,
      headers: headers,
    });
  } catch (e) {
    // // console.log(e);
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
};

export const registerAlumni = async ({ commit }, payload) => {
  let res = {};

  try {
    res = await axios({
      method: "post",
      url: `${API_BASE_URL}/${prefix}/users/register`,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (e) {
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
};
