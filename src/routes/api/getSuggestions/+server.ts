import { json } from "@sveltejs/kit"

import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from '$env/static/private'
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

export const GET = async ({ url }) => {
    const prompt = url.searchParams.get('prompt') ?? 'Write a poem about a wizard writing a resume';
    const completionCount = Number(url.searchParams.get('completionCount') ?? '3');
    const maxTokens = Number(url.searchParams.get('maxTokens') ?? '200');
  
    const openai = new OpenAIApi(configuration);
  
    let suggestions: string[] = []
  
    let temps: number[] = []
    switch (completionCount) {
        case 1: temps = [0.5]; break;
        case 2: temps = [0.3, 0.7]; break;
        case 3: temps = [0.2, 0.5, 0.8]; break;
        case 4: temps = [0.1, 0.3, 0.5, 0.7]; break;
        case 5: temps = [0.1, 0.3, 0.5, 0.7, 0.9]; break;
        case 6: temps = [0.1, 0.2, 0.4, 0.6, 0.8, 1.0]; break;
    }
  
    const completionPromises = temps.map(temp => openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temp,
        n: 1,
    }));
  
    const completionResponses = await Promise.all(completionPromises);
  
    completionResponses.forEach(response => {
        if (response.status == 200) {
            suggestions.push(response.data.choices[0].text ?? "");
        }
    });
  
    return json(suggestions);
  };


// http://127.0.0.1:5173/api/getSuggestions?prompt="Say a knock knock joke"&completionCount=3&maxTokens=200
