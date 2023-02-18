const Review = require("../models/review");
const Exhibition = require("../models/exhibition");

const ReviewsController = {
  All: (req, res) => {
    const exhibition_id = req.query.exhibition_id;
    const filter = exhibition_id ? { exhibition_id: exhibition_id } : {};
    Review.find(filter)
      .then((data) => res.send(data))
      .catch((e) => {
        res.status(500).send({ message: e.message });
      });
  },
  Create: async (req, res) => {
    let review = new Review({
      content: req.body.content,
      exhibition_id: req.body.exhibition_id,
    });
    console.log(req.body);
    const exhibition = await Exhibition.findById(review.exhibition_id);
    if (exhibition == null) throw new Error("Cannot find exhibition");
    try {
      review.save();
      res.send(review);
    } catch (e) {
      throw new Error("Cannot save review");
    }
  },
};

module.exports = ReviewsController;
