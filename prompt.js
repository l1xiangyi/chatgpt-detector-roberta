import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-D0sThRr6RxtlPDVzmhnzfGMV",
    apiKey: process.env.OPENAI_API_KEY,
});

const prompt = "Write a very short paragraph on chatGPT for cats, name it catGPT. Write like a lazy high school student. ";

const openai = new OpenAIApi(configuration);
const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 1.5,
    max_tokens: 150,
  });
console.log(completion.data.choices);