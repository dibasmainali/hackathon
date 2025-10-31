import { Router } from "express";
import { resources, suggestions } from "../controllers/carearGuide.controllers.js";
import { generateRoadmap } from "../controllers/roadmapController.js";


export const careerRouter = Router();

careerRouter.post("/suggestions",suggestions)
careerRouter.get("/resources",resources)




careerRouter.post("/generate-roadmap", generateRoadmap);

