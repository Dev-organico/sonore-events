import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import { loadEnv } from "config/envs";
import { connectDb, disconnectDB } from "config/database";

//loadEnv();

import { handleApplicationErrors } from "middlewares/error-handling-middleware";
import { signUpRouter } from "routes/sign-up-routes";
import { signInRouter } from "routes/sign-in-routes";
import { equipmentsRouter } from "routes/equipments-routes";
import { budgetsRouter } from "routes/budgets-routes";
import { equipmentsToBudgetsRouter } from "routes/equipments-to-budgets-routes";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/sign-up", signUpRouter)
  .use("/sign-in", signInRouter)
  .use("/equipments", equipmentsRouter)
  .use("/budgets",budgetsRouter)
  .use("/equipments-to-budget",equipmentsToBudgetsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
