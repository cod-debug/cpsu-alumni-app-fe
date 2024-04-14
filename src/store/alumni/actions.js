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

export const updateAlumni = async ({ commit }, payload) => {
  let res = {};

  try {
    res = await axios({
      method: "put",
      url: `${API_BASE_URL}/${prefix}/users/update/${payload.id}`,
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
      url: `${API_BASE_URL}/${prefix}/users/one/${payload}`,
      headers: headers,
    });
  } catch (e) {
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
};

export const getCountPerYear = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "get",
      url: `${API_BASE_URL}/${prefix}/users/count-per-year`,
      headers: headers,
    });
  } catch (e) {
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
};
