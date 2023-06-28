import { prisma } from "config/database";
import { formEquipmentToBudget } from "services/equipment-to-budgets-services";

async function createEquipmentToBudget(body: formEquipmentToBudget) {
  return await prisma.equipmentsToBudgets.create({
    data: {
      equipmentId: body.equipmentId,
      budgetsId: body.budgetsId,
      rentQuantity: body.rentQuantity,
    },
  });
}

export const equipmentsToBudgetsRepository = {
  createEquipmentToBudget,
};
