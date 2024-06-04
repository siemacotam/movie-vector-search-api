import catchAsync from "../../utils/catchAsync";
import { MongoClient, MongoError } from "mongodb";
import { Request, Response } from "express";
import { getResults } from "./movie.services";
import { mockedRequestBody } from "../../mocked/exampleVector";

const DATABASE = "sample_mflix";
const COLLECTION = "embedded_movies";
const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri);

export const get10SimilarMovies = catchAsync(
  async (req: Request, res: Response) => {
    // Commented because we mock request data
    // const { vector, year } = req.body;

    const { vector, year } = mockedRequestBody;

    if (!vector || !Array.isArray(vector)) {
      return res.status(400).json({ error: "Invalid vector format" });
    }
    if (typeof year !== "number") {
      return res.status(400).json({ error: "Invalid year format" });
    }

    try {
      await client.connect();
      const database = client.db(DATABASE);
      const collection = database.collection(COLLECTION);

      const results = await getResults(collection, vector, year);

      res.json(results);
    } catch (err) {
      if (err instanceof MongoError) {
        console.error("MongoDB error:", err);
      } else {
        console.error("General error:", err);
      }
      res.status(500).json({ error: "Internal server error" });
    } finally {
      try {
        await client.close();
      } catch (closeError) {
        console.error("Error closing MongoDB connection:", closeError);
      }
    }
  }
);
