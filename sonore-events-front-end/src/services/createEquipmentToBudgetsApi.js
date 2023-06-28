import api from "./api";

export async function postEquipmentToBudget(token, body) {
  const response = await api.post("/equipments-to-budget", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}