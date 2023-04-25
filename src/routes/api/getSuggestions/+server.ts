import { json } from "@sveltejs/kit"

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const GET = (async ({ url }) => {
    const prompt = url.searchParams.get('prompt') ?? 'Write a poem about a wizard writing a resume';
    const comletionCount = Number(url.searchParams.get('completionCount') ?? '3'); 
    const maxTokens = Number(url.searchParams.get('maxTokens') ?? '200');

    // console.log("getAICompletion call!");

    const openai = new OpenAIApi(configuration);

    // console.log("Prompt", prompt);
    // console.log("Completion Count", comletionCount);
    // console.log("Max Tokens", maxTokens);

    let suggestions: string[] = []

    let temps: number[] = []
    switch (comletionCount) {
        case 1: temps = [0.5]; break;
        case 2: temps = [0.3, 0.7]; break;
        case 3: temps = [0.2, 0.5, 0.8]; break;
        case 4: temps = [0.1, 0.3, 0.5, 0.7]; break;
        case 5: temps = [0.1, 0.3, 0.5, 0.7, 0.9]; break;
        case 6: temps = [0.1, 0.2, 0.4, 0.6, 0.8, 1.0]; break;
    }

   for (let temp of temps) {
        // For each temperature, create a completion response and append it to suggestions list
        let completionResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: maxTokens,
            temperature: temp,
            n: 1,
        });
        // If completionResponse is valid, append the response data string to suggestions list
        if (completionResponse.status == 200) {
            // If undefined, append empty string
            if (completionResponse.data.choices[0].text == undefined) {
                suggestions.push("");
            }
            else {
                suggestions.push(completionResponse.data.choices[0].text);
            }
        }
   }
//    console.log("Suggestions", suggestions);
   return json(suggestions);
});

// http://127.0.0.1:5173/api/getSuggestions?prompt="Say a knock knock joke"&completionCount=3&maxTokens=200
