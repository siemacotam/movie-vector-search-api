import express from "express";
import { json } from "body-parser";
import routes from "./routes";

const app = express();
const port = 3000;

app.use(json());

app.use("/v1", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
