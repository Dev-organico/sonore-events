import Joi from "joi";
import { formEquipmentToBudget } from "services/equipment-to-budgets-services";


export const createEquipmentToBudgetsSchema = Joi.object<formEquipmentToBudget>({
  equipmentId: Joi.number().required(),
  budgetsId: Joi.number().required(),
  rentQuantity: Joi.number().required(),
});
