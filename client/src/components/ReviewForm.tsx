import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExhibitionForm from "./ExhibitionForm";
import ExhibitionSelect from "./ExhibitionSelect";
import ExhibitionDataService from "../services/ExhibitionDataService";
import ReviewDataService from "../services/ReviewDataService";

const ReviewForm = () => {
  const [selectedExhibitionId, setSelectedExhibitionId] = useState("");
  const [newExhibitionTitle, setNewExhibitionTitle] = useState("");
  const [newExhibitionLocation, setNewExhibitionLocation] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const navigate = useNavigate();

  const onChangeReviewContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewContent(e.target.value);
  };

  const handlePost = () => {
    if (selectedExhibitionId === "")
      saveExhibition().then((id) => {
        saveReview(id);
      });
    else saveReview(selectedExhibitionId);
  };

  const saveReview = (id: string) => {
    const data = {
      exhibition_id: id,
      content: reviewContent,
    };
    ReviewDataService.create(data)
      .then((res) => {
        navigate(`/exhibitions/${res.data.exhibition_id}`);
      })
      .catch((e) => console.log(e));
  };

  const saveExhibition = async () => {
    const data = {
      title: newExhibitionTitle,
      location_id: newExhibitionLocation,
    };
    try {
      const res = await ExhibitionDataService.create(data);
      return res.data._id;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="submit-form">
        <div>
          <label>Exhibition</label>
          <ExhibitionSelect setExhibition={setSelectedExhibitionId} />
          <br></br>
          <label className="text-secondary">Don't see it? Add a new one</label>
          <ExhibitionForm
            setLocation={setNewExhibitionLocation}
            setTitle={setNewExhibitionTitle}
            title={newExhibitionTitle}
          />
          <br></br>
          <div className="form-group">
            <label>Your thoughts</label>
            <textarea
              className="form-control"
              id="review"
              required
              value={reviewContent}
              onChange={onChangeReviewContent}
              name="review"
            />
          </div>
          <br></br>
          <button onClick={handlePost} className="btn btn-dark">
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
