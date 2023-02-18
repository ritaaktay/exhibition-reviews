import axios from "./httpCommon";

class ExhibitionDataService {
  getAll() {
    return axios.get("exhibitions");
  }

  getById(id) {
    return axios.get(`exhibitions/${id}`);
  }

  create(data) {
    return axios.post(`exhibitions`, data);
  }
}

const service = new ExhibitionDataService();
export default service;
