import { Movie } from "./movie.interface";
import { Collection, Document, MongoError } from "mongodb";

const VECTOR_NAME = "vector_index";
const VECTOR_PATH = "plot_embedding";
const COSINE = "cosine";

export const getVectorSearchQuery = (limit: number, vector: number[]) => {
  return {
    $vectorSearch: {
      index: VECTOR_NAME,
      path: VECTOR_PATH,
      similarity: COSINE,
      queryVector: vector,
      numCandidates: limit,
      limit: limit,
    },
  };
};

export const convertResultsToMovie = (results: Document[]): Movie[] => {
  return results.map((result) => ({
    title: result.title,
    plot: result.plot,
    score: result.score,
  }));
};

export const getResults = async (
  collection: Collection<Document>,
  vector: number[],
  year: number
): Promise<Movie[]> => {
  try {
    // GET TOTAL NUMBER OF DOCUMENTS
    const totalDocuments = await collection.countDocuments();
    // CREATE VECTOR QUERY
    const vectorSearchQuery = getVectorSearchQuery(totalDocuments, vector);
    // CREATE FILTER QUERY
    const query = { year: { $lt: year } };

    const results = await collection
      .aggregate([
        vectorSearchQuery,
        { $match: query },
        {
          $project: {
            title: 1,
            plot: 1,
            score: { $meta: "vectorSearchScore" },
          },
        },
        { $limit: 10 },
      ])
      .toArray();

    return convertResultsToMovie(results);
  } catch (err) {
    if (err instanceof MongoError) {
      console.error("MongoDB error:", err);
    } else {
      console.error("General error:", err);
    }
    throw new Error("Error fetching results from database");
  }
};
