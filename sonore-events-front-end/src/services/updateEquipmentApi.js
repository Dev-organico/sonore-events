import api from "./api";

export async function updateEquipment(token, id, body) {
  await api.put(`/equipments/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
