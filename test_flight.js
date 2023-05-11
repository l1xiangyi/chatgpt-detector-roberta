import { Configuration, OpenAIApi } from "openai";
import fs from "fs";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const prompts = {
    primary_school_girl: "Answer the following question like you are a primary school girl. ",
    software_engineer: "Answer the following question like you are a 10yoe Google software engineer. "
}

const question = "Why is every book I hear about a \" NY Times # 1 Best Seller \" ? ELI5 : Why is every book I hear about a \" NY Times # 1 Best Seller \" ? Should n't there only be one \" # 1 \" best seller ? Please explain like I'm five."

const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompts['software_engineer'] + ' ' + question}],
    temperature: 1.5,
    max_tokens: 100,
});

console.log(completion.data.choices[0].message.content)