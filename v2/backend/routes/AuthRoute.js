import express from "express";
import { loginUser, logoutUser, getMyAccount } from "../controllers/Auth.js";

const router = express.Router();

router.get("/myAccount", getMyAccount);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);

export default router;
