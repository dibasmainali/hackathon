import fetch from "node-fetch";

const API_KEY = "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";

export const generateResume = async (userInput) => {
  const skillsString = Array.isArray(userInput.skills) ? userInput.skills.join(", ") : "";

  const prompt = `
You are an expert resume generator AI.

Using the following user data, generate a professional resume in clean JSON format that can be directly displayed on a website frontend.

User Data:
Full Name: ${userInput.fullName || ""}
Email: ${userInput.email || ""}
Phone: ${userInput.phone || ""}
Summary: ${userInput.summary || ""}
Education Degree: ${userInput.educationDegree || ""}
Education Institution: ${userInput.educationInstitution || ""}
Experience Position: ${userInput.experiencePosition || ""}
Experience Company: ${userInput.experienceCompany || ""}
Experience Description: ${userInput.experienceDescription || ""}
Skills: ${skillsString}
Project Name: ${userInput.projectName || ""}
Project Description: ${userInput.projectDescription || ""}

Return JSON strictly in the following structure note make the output more nicer enhance user detail write summary fluently and politely feel free to make it better and customise it but do the thing which is said like if he has wrote small description for any of these make it little longer consise and to the point  :
{
  "fullName": "",
  "contact": {
    "email": "",
    "phone": ""
  },
  "summary": "",
  "education": {
    "degree": "",
    "institution": ""
  },
  "experience": {
    "position": "",
    "company": "",
    "description": ""
  },
  "skills": [],
  "projects": [
    {
      "name": "",
      "description": ""
    }
  ]
}
Do NOT include any explanations, markdown, or text — only valid JSON.
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
        temperature: 0.5,
      }),
    });

    const data = await response.json();

    // ⚠️ Safety checks
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error("⚠️ API response is missing choices:", data);
      return null;
    }

    let rawContent = data.choices[0].message?.content;
    if (!rawContent) {
      console.error("⚠️ API response does not contain message content:", data.choices[0]);
      return null;
    }

    // Clean the response
    rawContent = rawContent
      .replace(/(^```json|^```|```$)/g, '')
      .replace(/<｜.*｜>/g, '')
      .trim();

    let resumeJSON;
    try {
      resumeJSON = JSON.parse(rawContent);
    } catch (err) {
      console.error("❌ Error parsing JSON, returning raw content.");
      resumeJSON = { raw: rawContent };
    }

    return resumeJSON;
  } catch (error) {
    console.error("⚠️ Error calling OpenRouter API:", error.message);
    return null;
  }
};


