import { json } from "@sveltejs/kit"

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

export async function GET() {
    console.log("getAICompletion call!")
    const openai = new OpenAIApi(configuration);
    console.log("Openai created!")
    const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
    });
    console.log("Got the response!")
    console.log(response.data.choices[0].text)
    return json(response.data.choices[0].text)
}