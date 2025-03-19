from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

MODEL_NAME = "tiiuae/falcon-rw-1b"  # lightweight and CPU friendly

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

def ask_user(question):
    response = input(f"{question} ➜ ")
    return response

def generate_schema(data):
    prompt = f"""
    You are a senior database architect.
    Based on the following description, generate a SQL schema using PostgreSQL syntax:

    {data}

    Only return valid SQL code.
    """

    result = generator(prompt, max_new_tokens=300, do_sample=True, temperature=0.7)
    return result[0]['generated_text']
