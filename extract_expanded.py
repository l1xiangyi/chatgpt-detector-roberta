import json

with open('dataset/all_5372_to_6185.jsonl', 'r') as jsonl_file, open('5372_to_6185.txt', 'w') as txt_file:
    for line in jsonl_file:
        data = json.loads(line)
        if 'chatgpt_answers_with_SDE_prompt' in data:
            answer = data['chatgpt_answers_with_SDE_prompt'].strip()  # Remove leading/trailing white spaces
            answer = answer.replace('\n', ' ')  # Replace newline characters with a space
            txt_file.write(answer + '\n')