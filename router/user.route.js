import { createUser, LoginUser } from "../controllers/user.controller.js";
import { User } from "../models/user.model.js";
import express from "express";

const router = express.Router();


router.post("/register", createUser)

router.post("/login" ,LoginUser);


export default router