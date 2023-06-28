import api from "./api";

export async function createEquipment(token, body) {
  const response = await api.post("/equipments", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
