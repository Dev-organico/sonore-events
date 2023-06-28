import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "middlewares/authentication-middleware";
import httpStatus from "http-status";
import { equipmentToBudgetsServices } from "services/equipment-to-budgets-services";


async function createEquipmentToBudget(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { body } = req;

  try {
    const result = await equipmentToBudgetsServices.createEquipmentToBudget(body);

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export const equipmentsToBudgetsControllers = {
    createEquipmentToBudget
}