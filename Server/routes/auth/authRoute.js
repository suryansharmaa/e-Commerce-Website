import { Router } from "express";
import registerUser from "../../controllers/auth/authController.js";
import { loginUser } from "../../controllers/auth/authController.js";
import { logoutUser } from "../../controllers/auth/authController.js";
import { authMiddleware } from "../../controllers/auth/authController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated User!",
    user,
  });
});
export default router;
