import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;
let prefix = "api";

let headers = {
  "Content-Type": "application/json; charset=utf-8",
};

export const getAllChats = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "get",
      url: `${API_BASE_URL}/${prefix}/message/get-all`,
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

export const getChats = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "get",
      url: `${API_BASE_URL}/${prefix}/message/list`,
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

export const getAllChatsByUser = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "get",
      url: `${API_BASE_URL}/${prefix}/message/by-user`,
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

export const send = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "post",
      url: `${API_BASE_URL}/${prefix}/message/send`,
      data: payload,
      headers: headers,
    });
  } catch (e) {
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
};

export const update = async ({ commit }, payload) => {
  let res = {};

  try {
    res = await axios({
      method: "put",
      url: `${API_BASE_URL}/${prefix}/message/update/${payload.id}`,
      data: payload,
      headers: headers,
    });
  } catch (e) {
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
};
