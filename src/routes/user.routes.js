import { Router } from "express";

import {
  signup,
  signin,
  getAllUsers,
  getUserById,
  getCurrentUser,
} from "../controllers/auth.user.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", checkAuth, getAllUsers);
router.get("/me", checkAuth, getCurrentUser);
router.get("/:id", checkAuth, getUserById);
router.post("/auth/signin", signin);
router.post("/auth/signup", signup);

export default router;
