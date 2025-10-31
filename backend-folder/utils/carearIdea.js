import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const client = new InferenceClient(process.env.HF_TOKEN);
export const responseFunc = async (findingInterest)=>{


  
  // PRO FORMAT PROMPT - Ultra clean output
  const prompt = `Favioirite subject: ${findingInterest.answer1},exciting work that user like to do : ${findingInterest.answer2}, user love working with : ${findingInterest.answer3} , users main goal :${findingInterest.answer4} , current skills or hobbies of user : ${findingInterest.answer5}
  
  Task: Recommend 3 careers. Use exact json format below:
  {
  id:[number 1 2 .. ]
  careerName: [Name],
  match: [Why this fits - max 30 words],
  future: [Future growth - max 15 words],
  
  ytsearchtitle:[Title for the resources of the career to search in youtube  ]
  
  }
  ---
  
  ---
  
  Repeat for 3 careers. return array of objects where each object should contain the above json thing . No introduction, no conclusion, no extra text. return output in json format also in josn format there is field called ytsearchtitle so please add the title for that career from which suer can search on youtube.   `;
  
  
  try {
    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "meta-llama/Llama-3.2-3B-Instruct",
      messages: [
        {
          role: "system",
          content: "You are a career advisor. Provide only the requested format. No introductory phrases like 'based on' or 'here are'. Start directly.  ",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 600,
      temperature: 0.6,
    });
  
    let response = chatCompletion.choices[0].message.content;
  
    // Clean up any unwanted intro/outro text
    response = response
      .replace(/Based on.*?:/gi, "")
      .replace(/According to.*?:/gi, "")
      .replace(/Here are.*?:/gi, "")
      .replace(/The person.*?:/gi, "")
      .replace(/These are.*?:/gi, "")
      .trim();
  
    
  

    console.log(response)
    return response
  
  
   
  
  } catch (error) {
    console.error("Error:", error.message);
    if (error.httpResponse) {
      console.error("Status:", error.httpResponse.status);
      console.error("Body:", error.httpResponse.body);
    }
  }
  
  
  
}



