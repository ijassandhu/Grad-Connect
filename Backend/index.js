import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "./DBconn.js";
import UserRouter from "./routes/user.js";
import eduInstitutionRouter from './routes/educationalIntitution.js'
const app = express();

connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", UserRouter);
app.use('/eduInstitution', eduInstitutionRouter)

app.get("/", (_req, res) => {
  res.status(400).json({
    success: true,
    message: "Under Development👷",
  });
});

app.listen(parseInt(process.env.PORT), "127.0.0.1", () => {
  console.log(`Running at server at http://localhost:${process.env.PORT}`);
});
