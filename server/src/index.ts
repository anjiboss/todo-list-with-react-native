import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
//  --------------------------------Import Routers
import { userRoute } from "./Routes/user";
import { todoRouter } from "./Routes/todo";

const main = async () => {
  await createConnection()
    .then(async () => {
      app.use("/v1/api/user", userRoute);
      app.use("/v1/api/todo", todoRouter);
      app.listen(PORT, () => console.log(`listenning on PORT: ${PORT}`));
    })
    .catch((err) => {
      console.log(err);
    });
};

main();
