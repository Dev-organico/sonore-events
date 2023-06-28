import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "middlewares/authentication-middleware";
import httpStatus from "http-status";
import { equipmentsServices } from "services/equipments-services";

async function getEquipments(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req;

  try {
    const result = await equipmentsServices.getEquipments(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
}

async function createEquipment(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req;
  const { body } = req;

  try {
    const result = await equipmentsServices.createEquipment(userId, body);

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

async function updateEquipment(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { body } = req;
  const equipmentId = +req.params.equipmentId

  try {
    await equipmentsServices.updateEquipment( body, equipmentId);

    return res.sendStatus(httpStatus.OK)
  } catch (error) {
    next(error);
  }
}

async function deleteEquipment(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const equipmentId = +req.params.equipmentId

  try {
    await equipmentsServices.deleteEquipment(equipmentId);

    return res.sendStatus(httpStatus.OK)
  } catch (error) {
    next(error);
  }
}



export const equipmentControllers = {
  getEquipments,
  createEquipment,
  updateEquipment,
  deleteEquipment
};
