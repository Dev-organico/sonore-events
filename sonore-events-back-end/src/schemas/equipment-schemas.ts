import Joi from "joi";
import { UpdateType, PartialEquipment } from "services/equipments-services";

export const createEquipmentSchema = Joi.object<PartialEquipment>({
  name: Joi.string().required(),
  type: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  image: Joi.string().required(),
});

export const updateEquipment = Joi.object<UpdateType>({
  price: Joi.number(),
  quantity: Joi.number(),
});
