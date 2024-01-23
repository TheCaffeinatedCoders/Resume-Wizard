import { json } from "@sveltejs/kit"

import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from '$env/static/private'
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

export async function GET() {
    console.log("getAICompletion call!");
    const openai = new OpenAIApi(configuration);
    console.log("Openai created!");

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Say a funny joke"},
      ],
      // max_tokens: 7,
      // temperature: 0,
    });
    console.log("Got the response!")
    return json(chatCompletion.data.choices[0].message?.content);
}