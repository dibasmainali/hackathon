import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { careerRouter } from "./routes/carearGuide.routes.js";
import { resumeRouter } from "./routes/resumeBuilder.routes.js";
import { connectDb } from "./config/db.config.js";
import router from "./routes/auth.routes.js";
dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT  || 4000 

// config middlewares
app.use(express.json());
app.use(cookieParser());


// router middlewares 
app.use("/api/career",careerRouter)
app.use("/api/resume",resumeRouter)
app.use("/api/auth",router)


app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})