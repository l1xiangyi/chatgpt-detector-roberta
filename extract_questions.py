import json

with open('dataset/all.jsonl', 'r') as jsonl_file, open('questions_base.txt', 'w') as txt_file:
    for line in jsonl_file:
        data = json.loads(line)
        answer = data['question'].strip()  # Remove leading/trailing white spaces
        answer = answer.replace('\n', ' ')  # Replace newline characters with a space
        txt_file.write(answer + '\n')