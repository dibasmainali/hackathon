import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateRoadmapAI = async (topic, duration) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an expert mentor. Create a ${duration}-month practical roadmap to master "${topic}".
Each month must have 4 weeks with specific tasks, like:
{
  "month1": {
    "week1": "task1",
    "week2": "task2",
    "week3": "task3",
    "week4": "task4"
  },
  "month2": {
    "week1": "task1",
    "week2": "task2",
    ...
  }
}
Return ONLY valid JSON in this exact structure.  
Keep each week concise (one or two short sentences). Do NOT add extra explanations outside the JSON.  
Focus on practical, actionable tasks.
`;

  const res = await model.generateContent(prompt);

  let text = "";
  if (res?.candidates?.length > 0) {
    text = res.candidates[0].content[0].text;
  } else if (res?.response?.text) {
    text = await res.response.text();
  } else {
    throw new Error("AI returned empty response");
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI returned no JSON: " + text);

  const roadmap = JSON.parse(jsonMatch[0]);

  console.log(roadmap); // just for debugging

  return roadmap; // ✅ return AI JSON directly
};
