import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { careerRouter } from "./routes/carearGuide.routes.js";
import { resumeRouter } from "./routes/resumeBuilder.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { connectDb } from "./config/db.config.js";
import router from "./routes/auth.routes.js";
dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT  || 4000 

// CORS middleware - must be before other middlewares
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	if (req.method === 'OPTIONS') {
		return res.status(200).json({});
	}
	next();
});

// config middlewares
app.use(express.json());
app.use(cookieParser());


// router middlewares 
app.use("/auth", authRoutes);
app.use("/api/career",careerRouter)
app.use("/api/resume",resumeRouter)
app.use("/api/auth",router)


app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})