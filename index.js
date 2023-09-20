import express from "express";
import { config } from "dotenv";
// import morgan from "morgan";
import routes from "./routes.js";
import cors from "cors";

// importing error handlers
import { notFound, errorHandler } from "./middleware/error.js";

config();
const app = express();
app.set("trust proxy", true);
// app.use(morgan("dev"));
app.use(cors());
app.use((req, res, next) => {
  console.log("req.ip:", req.ip);
  console.log("req.ips:", req.ips);
  console.log("req.headers", req.headers);
  console.log("remoteAddress", req.socket.remoteAddress);
  next();
});
app.use(express.json({ limit: "5mb" }));

app.use("/api", routes);

// test endpoint
app.get("/", (req, res) => {
  res.send("API is running\n");
});

app.use(notFound);
app.use(errorHandler);

// spinning up the server
const port = process.env.PORT || 5001;
app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}...`)
);
