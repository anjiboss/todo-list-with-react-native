"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const bcrypt = __importStar(require("bcryptjs"));
const userRoute = express_1.default.Router();
exports.userRoute = userRoute;
userRoute.get("/:username", async (req, res) => {
    const username = req.params.username;
    const userRepository = typeorm_1.getRepository(User_1.User);
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
        return res.json({
            ok: false,
            error: "User not found",
        });
    }
    return res.json({
        ok: true,
        user,
    });
});
userRoute.post("/", async (req, res) => {
    const { username, password } = req.body;
    const userRepo = typeorm_1.getRepository(User_1.User);
    const user = await userRepo.findOne({
        where: { username },
    });
    if (user) {
        res.json({
            ok: false,
            error: "username in use",
        });
    }
    const newUser = new User_1.User();
    newUser.username = username;
    const hashedPw = await bcrypt.hash(password, 10);
    newUser.password = hashedPw;
    await userRepo.save(newUser);
    res.json({
        ok: true,
    });
});
//# sourceMappingURL=user.js.map