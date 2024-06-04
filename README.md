# Movie Vector Search API

This project involves creating an API endpoint in Node.js (using Express.js) that searches a MongoDB Atlas database to find and filter the 10 closest documents based on a provided vector.

## Table of Contents

1. [Project Overview](#project-overview)
2. [API Endpoint](#api-endpoint)
3. [Dependencies](#dependencies)

## Project Overview

The task was to prepare an API endpoint that:

1. Creates a free MongoDB Atlas account and populates a collection with sample data.
2. Uses the `sample_mflix.embedded_movies` collection and creates a "Vector Search Index" on the `plot_embedding` field with the cosine similarity function.
3. Searches for movies created before 1950 (`year < 1950`) that are closest to the provided vector.
4. Returns the 10 nearest movies with their titles, plot, and vector comparison score.

## API Endpoint

### POST /v1/movies

**Description**: Searches for movies created before provided year, and that are closest to the provided vector.

**Request**:

- `Content-Type: application/json`
- Body: `json
{
  "vector": [0.1, 0.2, 0.3, ..., 0.512],
  "year": 1950
} `

**Response**:

- `Content-Type: application/json`
- Body:
  ```json
  [
    {
      "title": "Movie Title",
      "plot": "Movie plot...",
      "score": 0.85
    },
    ...
  ]
  ```

## Dependencies

- express
- mongodb
- dotenv

Dev

- typescript
- ts-node
