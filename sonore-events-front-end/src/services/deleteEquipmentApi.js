import api from "./api";

export async function deleteEquipment(token, id) {
  await api.delete(`/equipments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
