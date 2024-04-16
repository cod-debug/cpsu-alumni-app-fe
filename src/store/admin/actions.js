import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;
let prefix = "api";

let headers = {
  "Content-Type": "application/json; charset=utf-8",
};

export const getAdminList = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "get",
      url: `${API_BASE_URL}/${prefix}/admin/list`,
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

export const registerAdmin = async ({ commit }, payload) => {
  let res = {};

  try {
    res = await axios({
      method: "post",
      url: `${API_BASE_URL}/${prefix}/admin/register`,
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

export const updateAdmin = async ({ commit }, payload) => {
  let res = {};

  try {
    res = await axios({
      method: "put",
      url: `${API_BASE_URL}/${prefix}/admin/update/${payload.id}`,
      data: payload,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (e) {
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
};

export const getOne = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "get",
      url: `${API_BASE_URL}/${prefix}/admin/one/${payload}`,
      headers: headers,
    });
  } catch (e) {
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
};
