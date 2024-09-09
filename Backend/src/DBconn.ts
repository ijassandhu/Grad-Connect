import {connect} from "mongoose";

export default async() => await connect(process.env.MongoUri!)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

