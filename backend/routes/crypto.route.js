import express from "express";
import { facuet,Dashboradfacuet,createAdvert,getAdverts,getAdvert  } from "../controllers/crypto.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const cryptoRoutes = express.Router();

cryptoRoutes.post("/facuet", facuet);
cryptoRoutes.post("/facuet-dashboard", verifyToken, Dashboradfacuet);

cryptoRoutes.post("/create-advert", verifyToken, createAdvert);
cryptoRoutes.get("/adverts", verifyToken, getAdverts);
cryptoRoutes.get("/advert/:id", verifyToken, getAdvert);



export default cryptoRoutes;