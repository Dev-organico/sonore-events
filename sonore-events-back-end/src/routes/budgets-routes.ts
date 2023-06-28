import { budgetsControllers } from "controllers/budgets-controllers";
import { Router } from "express";
import { authenticateToken } from "middlewares/authentication-middleware";
import { validateBody } from "middlewares/validation-middleware";
import { createBudgetSchema } from "schemas/budgets-schemas";

const budgetsRouter = Router();

budgetsRouter
  .all("/*", authenticateToken)
  .get("",budgetsControllers.getBudgtes)
  .post("", validateBody(createBudgetSchema),budgetsControllers.createBudget)
  .delete("/:budgetId",budgetsControllers.deleteBudget);

export { budgetsRouter };
