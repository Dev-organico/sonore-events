
import { equipmentControllers } from "controllers/equipments-controllers";
import { Router } from "express";
import { authenticateToken } from "middlewares/authentication-middleware";
import { validateBody } from "middlewares/validation-middleware";
import { createEquipmentSchema, updateEquipment } from "schemas/equipment-schemas";

const equipmentsRouter = Router();

equipmentsRouter
  .all("/*", authenticateToken)
  .get("",equipmentControllers.getEquipments )
  .post("", validateBody(createEquipmentSchema), equipmentControllers.createEquipment)
  .put("/:equipmentId",validateBody(updateEquipment), equipmentControllers.updateEquipment)
  .delete("/:equipmentId", equipmentControllers.deleteEquipment)

export { equipmentsRouter };
