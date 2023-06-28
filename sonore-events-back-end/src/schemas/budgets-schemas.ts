import Joi from "joi";
import { formBudget } from "services/budgets-services";

export const createBudgetSchema = Joi.object<formBudget>({
  name: Joi.string().required(),
  comment: Joi.string().required(),
  finalPrice: Joi.number().required(),
});
