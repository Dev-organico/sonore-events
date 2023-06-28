import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "middlewares/authentication-middleware";
import httpStatus from "http-status";
import { budgetsServices } from "services/budgets-services";

async function getBudgtes(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req;

  try {
    const result = await budgetsServices.getBudgets(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
}

async function createBudget(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req;
  const { body } = req;

  try {
    const result = await budgetsServices.createBudget(userId, body);

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

async function deleteBudget(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) {
    const budgetId = +req.params.budgetId
  
    try {
      await budgetsServices.deleteBudget(budgetId);
  
      return res.sendStatus(httpStatus.OK)
    } catch (error) {
      next(error);
    }
  }

  export const budgetsControllers = {
    getBudgtes,
    createBudget,
    deleteBudget
  }