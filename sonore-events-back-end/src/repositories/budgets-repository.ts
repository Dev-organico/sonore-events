import { prisma } from "config/database";
import { PartialBudget, formBudget } from "services/budgets-services";

async function getBudgets(userId: number): Promise<PartialBudget[]> {
  return await prisma.budgets.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      comment: true,
      finalPrice: true,
      createdAt:true,
      EquipmentToBudget: {
        include: {
          Equipment: true,
        },
      },
    },
  });
}

async function findBudgetByName(name: string) {
  return await prisma.budgets.findFirst({
    where: {
      name,
    },
  });
}

async function findBudgetById(id: number) {
  return await prisma.budgets.findFirst({
    where: {
      id,
    },
  });
}

async function createBudget(userId: number, body: formBudget) {
  return await prisma.budgets.create({
    data: {
      userId,
      name: body.name,
      comment: body.comment,
      finalPrice: body.finalPrice,
    },
  });
}

async function deleteBudget(budgetId: number) {
  await prisma.budgets.delete({
    where: {
      id: budgetId,
    },
  });
}

export const budgetsRepository = {
  getBudgets,
  findBudgetByName,
  findBudgetById,
  createBudget,
  deleteBudget,
};
