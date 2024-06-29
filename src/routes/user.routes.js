import { Router } from "express";
import {
  signup,
  signin,
  getAllUsers,
  getUserById,
} from "../controllers/auth.user.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/auth/signin", signin);
router.post("/auth/signup", signup);

export default router;
