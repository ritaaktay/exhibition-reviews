import axios from "./httpCommon";

class LocationDataService {
  getAll() {
    return axios.get("locations");
  }
}

const service = new LocationDataService();
export default service;
