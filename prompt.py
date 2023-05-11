import openai
import os

prompt = "Write a very short paragraph on chatGPT for cats, name it catGPT. Write like a lazy high school student. "

openai.api_key = os.getenv("OPENAI_API_KEY")

openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt},
    ]
)