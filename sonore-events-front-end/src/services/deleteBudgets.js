import api from "./api";

export async function deleteBudget(token, id) {
  await api.delete(`/budgets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
