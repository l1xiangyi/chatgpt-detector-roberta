import torch
from transformers import pipeline

generate_text = pipeline(
    model="databricks/dolly-v2-3b", 
    torch_dtype=torch.bfloat16, 
    trust_remote_code=True, 
    device_map="auto")

res = generate_text("Explain to me the difference between nuclear fission and fusion.")
print(res[0]["generated_text"])


import json

# Open the input file, output file and text file for storing Dolly's answers
with open('dataset/all.jsonl', 'r') as jsonl_file, open('dataset/all_dolly_from_1.jsonl', 'w') as outfile, open('dolly_from_1.txt', 'w') as txtfile:
    for line in jsonl_file:
        # Parse JSONL line into a Python dictionary
        data = json.loads(line)
        
        # Extract the question
        question = data['question']
        
        # Generate answer using Dolly model
        res = generate_text(question)
        
        # Add Dolly's answer to the data dictionary
        data['dolly_answers'] = [res[0]["generated_text"]]
        
        # Write the modified data dictionary to the output file
        json.dump(data, outfile)
        outfile.write('\n')
        
        # Write Dolly's answer to the text file, replacing newline characters with spaces
        txtfile.write(res[0]["generated_text"].replace('\n', ' ') + '\n')
