import express from "express";
import { login, logout, myAccount } from "../controllers/Auth.js";

const router = express.Router();

router.get("/myAccount", myAccount);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
