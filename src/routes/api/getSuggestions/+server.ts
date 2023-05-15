import { json } from "@sveltejs/kit"

import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from '$env/static/private'
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

export const GET = async ({ url }) => {
    const userDescription = url.searchParams.get('prompt') ?? 'Write a poem about a wizard writing a resume';
    const templatePrompt = "I am a highly intelligent resume builder bot. When provided with a basic description from the user about a particular section on a resume, I generate a more beautifully written response that would look good on a resume. I make sure that in my responses I am not inventing any information or using any information that was not explicitly provided by the user. Although, I am open to generate new quantitative representation for modified description which not listed from user input. My responses are concise, accurate, and clearly represent the same meaning as the user's input, but written in a more beautiful, reputable way. My responses use exclusively user provided information, without inventing or using any information that was not explicitly provided by the user. Make sure the output sentences are not sentence, but predicate. Do not include word 'I' and other 3rd-person pronoun. Here is the description of the users current section to rewrite: \n\n";
    const prompt = templatePrompt + userDescription;

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

    // For each sugestion, remove any leading or trailing whitepaces or new lines
    suggestions = suggestions.map(suggestion => suggestion.trim());

    return json(suggestions);
};


// http://127.0.0.1:5173/api/getSuggestions?prompt="Say a knock knock joke"&completionCount=3&maxTokens=200
