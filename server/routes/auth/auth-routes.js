// auth-routes.js (ESM fixed)
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} from "../../controllers/auth/auth-controller.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Logout route
router.post("/logout", logoutUser);

// Check-auth route
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

export default router; // ✅ Correct way in ESM
