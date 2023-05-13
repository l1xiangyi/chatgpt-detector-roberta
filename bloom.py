from transformers import AutoTokenizer, AutoModelForCausalLM
from accelerate import Accelerator

# Initialize accelerator
accelerator = Accelerator()

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("bigscience/bloom")
model = AutoModelForCausalLM.from_pretrained("bigscience/bloom")

# Move model to device
model = accelerator.prepare(model)

# Define prompt
prompt = "Hello, this is a test of BLOOM language model."

# Encode prompt
input_ids = tokenizer.encode(prompt, return_tensors="pt")

# Generate text
output_ids = model.generate(input_ids)

# Decode output
output_text = tokenizer.decode(output_ids[0], skip_special_tokens=True)

# Print output
print(output_text)