import prisma from "./prisma";
import express from "express";
import AuthRouter from "./routes/auth.routes";
import errorMiddleware from "./middleware/error.middleware";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(AuthRouter);

app.use(errorMiddleware);

prisma
  .$connect()
  .then(() => {
    app.listen(3008, () => {
      console.log("Listening to port : http://localhost:3008");
    });
  })
  .catch((error: any) => {
    console.log("Error while connecting to the database : ", error);
  });
