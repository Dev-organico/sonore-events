import api from "./api";

export async function getEquipments(token) {
    const response = await api.get('/equipments', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      return response.data;
    }
    
