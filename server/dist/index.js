"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
const user_1 = require("./Routes/user");
const todo_1 = require("./Routes/todo");
const main = async () => {
    await typeorm_1.createConnection()
        .then(async () => {
        app.use("/v1/api/user", user_1.userRoute);
        app.use("/v1/api/todo", todo_1.todoRouter);
        app.listen(PORT, () => console.log(`listenning on PORT: ${PORT}`));
    })
        .catch((err) => {
        console.log(err);
    });
};
main();
//# sourceMappingURL=index.js.map