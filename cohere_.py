import cohere
import os
import json

COHERE_API_KEY = os.getenv("COHERE_API_KEY")

co = cohere.Client(COHERE_API_KEY)

response = co.generate(
  prompt='Once upon a time in a magical land called',
  max_tokens=50,
  temperature=1.2
)
print(response)


with open('dataset/all.jsonl', 'r') as jsonl_file, open('cohere_from_1.txt', 'w') as txtfile:
    for i, line in enumerate(jsonl_file):
        if i >= 100:  # stop after reading 30 lines
            break
        # Parse JSONL line into a Python dictionary
        data = json.loads(line)
        
        # Extract the question
        question = data['question']
        
        # Generate answer using Dolly model
        response = co.generate(
            prompt=question,
            max_tokens=50,
            temperature=1.2
        )

        result = response.generations[0].text
        
        # Write Dolly's answer to the text file, replacing newline characters with spaces
        txtfile.write(result.replace('\n', ' ') + '\n')
