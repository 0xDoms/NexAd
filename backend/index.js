import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from "path";

import cryptoRoutes  from "./routes/crypto.route.js"
import authRoutes  from "./routes/auth.route.js"

import { connectDB } from './db/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // Parse incoming requests
app.use(cookieParser()); // Parse incoming cookies

app.use("/api/crypto", cryptoRoutes);
app.use("/api/auth", authRoutes);


console.log("Current NODE_ENV:", process.env.NODE_ENV);
if (process.env.NODE_ENV === process.env.NODE_ENV) {
    console.log("Test")
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
}


app.listen(PORT, ()=> {
    connectDB();
    console.log(path.join(__dirname, "../frontend/dist"));
    console.log("Server is running on port: ",PORT);
});