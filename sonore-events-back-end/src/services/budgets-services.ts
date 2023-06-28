import { Budgets } from "@prisma/client";
import { conflictError } from "errors/conflict-error";
import { notFoundError } from "errors/not-found-error";
import { budgetsRepository } from "repositories/budgets-repository";

async function getBudgets(userId: number): Promise<PartialBudget[]> {
  const allBudgetsByUserId = await budgetsRepository.getBudgets(userId);

  return allBudgetsByUserId;
}

async function nameConflict(name: string) {
  const budgetByName = await budgetsRepository.findBudgetByName(name);

  if (budgetByName)
    throw conflictError("A budget with this name already exist");
}

async function budgetExistsOrError(budgetId: number) {
  const budgetById = await budgetsRepository.findBudgetById(budgetId);

  if (!budgetById) throw notFoundError();
}

async function createBudget(userId: number, body: formBudget) {
  await nameConflict(body.name);

  const createdEquipment = await budgetsRepository.createBudget(userId, body);

  return createdEquipment;
}

async function deleteBudget(budgetId: number) {
  await budgetExistsOrError(budgetId);

  await budgetsRepository.deleteBudget(budgetId);
}

export type PartialBudget = Omit<Budgets, "userId" | "createdAt" | "updatedAt">;

export type formBudget = Omit<
  Budgets,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export const budgetsServices = {
  getBudgets,
  createBudget,
  deleteBudget,
};
