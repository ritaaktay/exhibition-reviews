if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// APP
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// MIDDLEWARE
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

// DATABASE
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log("Connected to database:", process.env.DATABASE_URL))
  .catch((e) => console.log("Cannot connect to databae:", e));
const db = mongoose.connection;
db.on("error", (error) => console.error(error));

// ROUTES
const exhibitionsRouter = require("./routes/exhibitions");
app.use("/exhibitions", exhibitionsRouter);
const locationsRouter = require("./routes/locations");
app.use("/locations", locationsRouter);
const reviewsRouter = require("./routes/reviews");
app.use("/reviews", reviewsRouter);

// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
