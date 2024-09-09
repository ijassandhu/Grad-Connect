import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "./DBconn.ts"
import UserRouter from './routes/user.ts'
const app = express();

connect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', UserRouter);

app.get("/", (_req: Request, res: Response) => {
  res.status(400).json({
    success: true,
    message: "Under Development👷",
  });
});

app.listen(parseInt(process.env.PORT as string), "127.0.0.1", () => {
  console.log(`Running at server at http://localhost:${process.env.PORT}`);
});
