const BASE_URL = "http://localhost:8000";

// 🆕 Create new project
export async function createProject(message) {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return res.json();
}

// 💬 Add message to existing project
export async function sendMessageToProject(projectId, message) {
  const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return res.json();
}

// 📖 Get full message history
export async function getProjectMessages(projectId) {
  const res = await fetch(`${BASE_URL}/projects/${projectId}`);
  return res.json();
}

// 📚 Get all projects with preview
export async function getAllProjects() {
  const res = await fetch(`${BASE_URL}/projects`);
  return res.json();
}
