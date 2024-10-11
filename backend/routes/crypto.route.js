import express from "express";
import { facuet,Dashboradfacuet  } from "../controllers/crypto.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const cryptoRoutes = express.Router();

cryptoRoutes.post("/facuet", facuet);
cryptoRoutes.post("/facuet-dashboard", verifyToken, Dashboradfacuet);

export default cryptoRoutes;