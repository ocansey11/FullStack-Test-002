# test_agent.py
from app.core.schema_agent import process_user_message
# from pprint import pprint

# Test with NEW project (no project_id)
print("=== Starting NEW Project ===")
response, project_id = process_user_message("I want to build a database for movie rentals", None)
print(f"Project ID: {project_id}")
print("Assistant:", response)

# Test with EXISTING project
print("\n=== Continuing EXISTING Project ===")
response, project_id = process_user_message("Add actors and genres to the schema", project_id)
print(f"Project ID: {project_id}")
print("Assistant:", response)
