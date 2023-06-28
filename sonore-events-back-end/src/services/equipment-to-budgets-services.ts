import { EquipmentsToBudgets } from "@prisma/client";
import { notFoundError } from "errors/not-found-error";
import { budgetsRepository } from "repositories/budgets-repository";
import { equipmentsToBudgetsRepository } from "repositories/equipment-to-budget-repository";

async function budgetExistsOrError(budgetId: number) {
  const budgetById = await budgetsRepository.findBudgetById(budgetId);

  if (!budgetById) throw notFoundError();
}

async function createEquipmentToBudget(body: formEquipmentToBudget) {
  await budgetExistsOrError(body.budgetsId);

  const createdEquipmentToBudget =
    await equipmentsToBudgetsRepository.createEquipmentToBudget(body);

  return createdEquipmentToBudget;
}

export type formEquipmentToBudget = Omit<EquipmentsToBudgets, "id">;

export const equipmentToBudgetsServices = {
  createEquipmentToBudget,
};
