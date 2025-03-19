# import os
# from developer.agent import Agent
# from dotenv import load_dotenv
# from tools import ask_user, generate_schema

# load_dotenv()

# agent = Agent(name="SchemaDesignerAgent")

# agent.add_tool(ask_user)
# agent.add_tool(generate_schema)

# def run_agent():
#     agent.think("Start a Q&A session to gather project details.")
#     agent.observe()
#     schema = agent.act()
#     return schema

# if __name__ == "__main__":
#     schema = run_agent()
#     print(schema)


from tools import ask_user, generate_schema

class SchemaDesignerAgent:
    def __init__(self):
        self.goal = ""
        self.user_inputs = {}

    def think(self, goal):
        self.goal = goal
        print(f"[🧠 Agent Thinking] Goal: {goal}")

    def observe(self):
        print("[👀 Agent Observing] Asking user questions...\n")
        self.user_inputs['app_name'] = ask_user("What is the name of your app?")
        self.user_inputs['data_types'] = ask_user("What kind of data does your app manage?")
        self.user_inputs['entities'] = ask_user("List your core entities (e.g., users, posts, products)")
        self.user_inputs['relationships'] = ask_user("Describe any relationships between entities")

    def act(self):
        print("\n[⚙️ Agent Acting] Generating schema based on input...\n")
        prompt_data = f"""
        App name: {self.user_inputs['app_name']}
        Data types: {self.user_inputs['data_types']}
        Entities: {self.user_inputs['entities']}
        Relationships: {self.user_inputs['relationships']}
        """
        schema = generate_schema(prompt_data)
        return schema


if __name__ == "__main__":
    agent = SchemaDesignerAgent()
    agent.think("Help user design a database schema through Q&A")
    agent.observe()
    schema = agent.act()
    print("\n[✅ Generated Schema]\n")
    print(schema)
