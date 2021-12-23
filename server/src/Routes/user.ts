import express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";

const userRoute = express.Router();

userRoute.get("/:username", async (req, res) => {
  const username = req.params.username;
  const userRepository = getRepository(User);
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
  // Check if user registered;
  const userRepo = getRepository(User);
  const user = await userRepo.findOne({
    where: { username },
  });
  if (user) {
    res.json({
      ok: false,
      error: "username in use",
    });
  }

  const newUser = new User();
  newUser.username = username;
  const hashedPw = await bcrypt.hash(password, 10);
  newUser.password = hashedPw;
  //just add this line for testing
  await userRepo.save(newUser);
  res.json({
    ok: true,
  });
});

export { userRoute };
