import api from "./api";

export async function postBudget(token, body) {
  const response = await api.post("/budgets", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}