import { json } from "@sveltejs/kit"

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const GET = (async ({ url }) => {
    const prompt = url.searchParams.get('prompt') ?? 'Write a poem about a wizard writing a resume';
    const comletionCount = Number(url.searchParams.get('completionCount') ?? '3'); 
    const maxTokens = Number(url.searchParams.get('maxTokens') ?? '200');
    const temperature = Number(url.searchParams.get('temperature') ?? '0.7');

    console.log("getAICompletion call!");

    const openai = new OpenAIApi(configuration);

    console.log("Prompt", prompt);
    console.log("Completion Count", comletionCount);
    console.log("Max Tokens", maxTokens);

    const completionResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: maxTokens,
        temperature: temperature,
        n: comletionCount,
    });

    // If the response if valid, return the choices
    if (completionResponse.status == 200) {
        return json(completionResponse.data.choices)
    }
    else {
        return json(completionResponse)
    }

});


// http://127.0.0.1:5173/api/getAiCompletions?prompt="Say hello world"&completionCount=3&maxTokens=200&temperature=0.7