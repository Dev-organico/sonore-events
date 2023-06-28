import { equipmentsToBudgetsControllers } from "controllers/equipments-to-budgets-controllers";
import { Router } from "express";
import { authenticateToken } from "middlewares/authentication-middleware";
import { validateBody } from "middlewares/validation-middleware";
import { createEquipmentToBudgetsSchema } from "schemas/equipments-to-budgets-schemas";

const equipmentsToBudgetsRouter = Router();

equipmentsToBudgetsRouter
  .all("/*", authenticateToken)
  .post(
    "",
    validateBody(createEquipmentToBudgetsSchema),
    equipmentsToBudgetsControllers.createEquipmentToBudget
  );

export { equipmentsToBudgetsRouter };
