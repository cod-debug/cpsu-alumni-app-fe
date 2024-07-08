import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;
let prefix = "api";

let headers = {
  "Content-Type": "application/json; charset=utf-8",
};

export const getPaginated = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "get",
      url: `${API_BASE_URL}/${prefix}/job_posting/get-paginated`,
      params: payload,
      headers: headers,
    });
  } catch (e) {
    // // console.log(e);
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
}

export const getOne = async ({ commit }, payload) => {
  let res = {};
  headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  try {
    res = await axios({
      method: "get",
      url: `${API_BASE_URL}/${prefix}/job_posting/get-one/${payload}`,
      headers: headers,
    });
  } catch (e) {
    res.data = e.response.data;
    res.status = e.response.status;
  }
  return res;
}


export const create = async ({ commit }, payload) => {
  let res = {};

  try {
    res = await axios({
      method: "post",
      url: `${API_BASE_URL}/${prefix}/job_posting/create`,
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
}

export const update = async ({ commit }, payload) => {
  let res = {};

  try {
    res = await axios({
      method: "put",
      url: `${API_BASE_URL}/${prefix}/job_posting/update/${payload.id}`,
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
}

export const remove = async ({ commit }, payload) => {
  let res = {};

  try {
    res = await axios({
      method: "delete",
      url: `${API_BASE_URL}/${prefix}/job_posting/delete/${payload.id}`,
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
}