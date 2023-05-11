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

const fileName = "dataset/all.jsonl";
const newFileName = `dataset/all_expanded.jsonl_${Date.now().toString()}.jsonl`;

fs.readFile(fileName, 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    const lines = data.split('\n');

    const writeStream = fs.createWriteStream(newFileName);
    let i = 1;
    for (const line of lines) {
    // for (let i = 0; i < 2; i++) {
    //     const line = lines[i];
        if (line) {
            const jsonData = JSON.parse(line);
    
            const question = jsonData.question;
            console.log("question " + i + ": " + question + " being generated")

            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: prompts['software_engineer'] + ' ' + question}],
                temperature: 1.5,
                max_tokens: 100,
            });
    
            const contents = completion.data.choices[0].message.content;
            jsonData.chatgpt_answers_with_SDE_prompt = contents;
    
            writeStream.write(JSON.stringify(jsonData) + '\n');
        }
        i += 1;
    }

    writeStream.end();
  

    writeStream.on('finish', () => {
        console.log(`File '${newFileName}' has been created.`);
    });
    
      writeStream.on('error', (err) => {
        console.error(err);
    });
});
