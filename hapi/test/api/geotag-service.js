import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const geoTagService = {
  geoTagUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.geoTagUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.geoTagUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.geoTagUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.geoTagUrl}/api/users`);
    return res.data;
  },

  async createCategory(category) {
    const res = await axios.post(`${this.geoTagUrl}/api/category`, category);
    return res.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.geoTagUrl}/api/category`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.geoTagUrl}/api/category/${id}`);
    return response;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.geoTagUrl}/api/category`);
    return res.data;
  },

  async getUserCategories(id){
    const res = await axios.get(`${this.geoTagUrl}/api/category/user/${id}`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.geoTagUrl}/api/category/${id}`);
    return res.data;
  },

  async getAllPOI() {
    const res = await axios.get(`${this.geoTagUrl}/api/poi`);
    return res.data;
  },

  async getCategoryPOI(id) {
    const res = await axios.get(`${this.geoTagUrl}/api/category/${id}/poi`);
    return res.data;
  },

  async createPOI(id, poi) {
    const res = await axios.post(`${this.geoTagUrl}/api/category/${id}/poi`, poi);
    return res.data;
  },

  async deleteAllPOI() {
    const res = await axios.delete(`${this.geoTagUrl}/api/poi`);
    return res.data;
  },

  async getPOI(id) {
    const res = await axios.get(`${this.geoTagUrl}/api/poi/${id}`);
    return res.data;
  },

  async getPOIWeather(id) {
    const res = await axios.get(`${this.geoTagUrl}/api/poi/${id}/weather`);
    return res.data;
  },

  async deletePOI(id) {
    const res = await axios.delete(`${this.geoTagUrl}/api/poi/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.geoTagUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  },

  async uploadImage(imageData){
    const response = await axios.post(`${this.geoTagUrl}/api/image`, imageData);
    return response.data;
  },

  async delateImage(imageURL){
    const response = await axios.delete(`${this.geoTagUrl}/api/image`, imageURL);
    return response;
  },
};
