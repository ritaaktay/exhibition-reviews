const Exhibition = require("../models/exhibition");
const Location = require("../models/location");

const ExhibitionsController = {
  All: async (req, res) => {
    const exhibitions = await Exhibition.find({}).sort({ title: 1 });
    res.send(exhibitions);
  },
  GetById: async (req, res) => {
    const exhibition = await Exhibition.findById(req.params.id);
    res.send(exhibition);
  },
  Create: async (req, res) => {
    let exhibition = new Exhibition();
    exhibition.title = req.body.title;
    let location = await Location.findById(req.body.location_id);
    if (location == null) throw new Error("Cannot find location");
    exhibition.location_id = location._id;
    try {
      await exhibition.save();
      res.send(exhibition);
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = ExhibitionsController;
