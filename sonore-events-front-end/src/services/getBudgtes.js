import api from "./api";

export async function getBudgets(token) {
    const response = await api.get('/budgets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      return response.data;
    }
    
