// if (process.env.DATABASE_URL) require("dotenv").config();
require("dotenv").config()

const express = require("express");
const app = express();

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

const cors = require("cors");

app.use(cors());
app.use(express.json());

const router = express.Router()
router.get('/', cors(), (req, res) => {
  res.json({ message:
  'Welcome! You can access the data using these routes: /movies, /reviews, /theaters, /reviews/:reviewId, /movies/:movieId, /movies/:movieId/theaters, and /movies/:movieId/reviews.'});
})

app.use('/', router);

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);
 
app.use((req, res, next) => {
  next({ status: 404, message: "That page doesn't exist." });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong on our end!" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;