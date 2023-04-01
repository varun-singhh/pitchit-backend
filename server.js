// Importing Packages
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import auth from "./routes/auth.js";
import userRoutes from "./routes/user/route.js";
import recruiterRoutes from "./routes/recruiter/route.js";
import dotenv from "dotenv";
import chalk from "chalk";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
dotenv.config();

// Configuring the Swagger Docs
const swaggerDocument = JSON.parse(
  await readFile(new URL("./swagger.json", import.meta.url))
);

// Setting up the app base routers
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", auth);
app.use("/api", userRoutes);
app.use("/api", recruiterRoutes);

// Setting up the mongoose database
const CONNECTION_URL =
  "mongodb+srv://varun-singhh:Varunsingh123@cluster0.iohjq.mongodb.net/PitchitDB?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(chalk.white.bgBlue(`Server running on Port ${PORT}`))
    )
  )
  .catch((err) => console.log(err));
