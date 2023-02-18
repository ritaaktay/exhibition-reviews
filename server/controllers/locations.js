const Location = require("../models/location");

const LocationsController = {
  All: async (req, res) => {
    const locations = await Location.find({}).sort({ location: 1 });
    res.send(locations);
  },
};

module.exports = LocationsController;
