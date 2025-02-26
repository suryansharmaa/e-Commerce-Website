import { Router } from "express";
import registerUser from "../../controllers/auth/authController.js";
import { loginUser } from "../../controllers/auth/authController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
