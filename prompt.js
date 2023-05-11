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
// const newFileName = `dataset/all_expanded.jsonl_${Date.now().toString()}.jsonl`;
const newFileName = `dataset/all_expanded.jsonl_from_394.jsonl`;

const timestamp = Date.now();
const logFileName = `logs_${timestamp}.txt`;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function logger(message) {
    fs.appendFileSync(logFileName, message + '\n');
    console.log(message);
}

fs.readFile(fileName, 'utf8', async (err, data) => {
    if (err) {
        logger(err);
        return;
    }
  
    const lines = data.split('\n');

    const writeStream = fs.createWriteStream(newFileName);
    // let i = 1;
    // for (const line of lines) {
    for (let i = 499; i < lines.length; i++) {
        const line = lines[i];
        if (line) {
            const jsonData = JSON.parse(line);
            const question = jsonData.question;
            logger("question " + i + ": " + question + " being generated");

            let success = false;
            let retries = 5;

            while (!success && retries > 0) {
                try {
                    const completion = await openai.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        messages: [{role: "user", content: prompts['software_engineer'] + ' ' + question}],
                        temperature: 1.5,
                        max_tokens: 100,
                    });

                    const contents = completion.data.choices[0].message.content;
                    jsonData.chatgpt_answers_with_SDE_prompt = contents;

                    writeStream.write(JSON.stringify(jsonData) + '\n');
                    success = true;
                } catch (error) {
                    logger(`Error occurred while generating answer for question ${i}: ${error}`);
                    if (retries == 5) {
                        await sleep(5000); // Sleep for 5 seconds before retrying
                    }
                    retries--;
                    if (retries === 0) {
                        logger(`All retries failed for question ${i}. Skipping this question.`);
                    } else {
                        logger(`Retrying question ${i} (${retries} retries left)...`);
                    }
                }
            }
        }
    }

    writeStream.end();
  

    writeStream.on('finish', () => {
        logger(`File '${newFileName}' has been created.`);
    });
    
      writeStream.on('error', (err) => {
        logger(err);
    });
});
