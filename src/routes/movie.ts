import express, { Router } from "express";
import { movieController } from "../modules/movies";

const router: Router = express.Router();

router
  .route("/")
  .post(movieController.get10SimilarMovies)
  .get(movieController.get10SimilarMovies);

export default router;
