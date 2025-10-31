import { generateRoadmapAI } from "../utils/roadmapGen.js";


export const generateRoadmap = async (req, res) => {
  try {
    const { topic, duration } = req.body;

    if (!topic || !duration) {
      return res.status(400).json({
        success: false,
        message: "Topic and duration are required",
      });
    }

    const roadmap = await generateRoadmapAI(topic, duration);

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error("Error generating roadmap:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate roadmap",
      error: error.message,
    });
  }
};
