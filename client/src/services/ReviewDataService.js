import axios from "./httpCommon";

class ReviewDataService {
  getAllByExhibitionId(exhibition_id) {
    return axios.get(`/reviews?exhibition_id=${exhibition_id}`);
  }

  create(data) {
    return axios.post("/reviews", data);
  }
}

const service = new ReviewDataService();
export default service;
