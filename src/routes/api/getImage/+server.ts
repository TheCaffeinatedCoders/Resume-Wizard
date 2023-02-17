import { json } from "@sveltejs/kit"

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

export async function GET() {
    console.log("getImage call!")
    const openai = new OpenAIApi(configuration);
    console.log("Openai created!")
    const response = await openai.createImage({
      prompt: "Apple products",
      n: 1,
      size: "256x256",
    });
    console.log("Got the response!")
    console.log(response.data.data[0].url)
    return json(response.data.data[0].url)
}