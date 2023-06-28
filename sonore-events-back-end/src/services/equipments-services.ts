import { Equipment, Prisma } from "@prisma/client";
import { conflictError } from "errors/conflict-error";
import { notFoundError } from "errors/not-found-error";
import { equipmentsRepository } from "repositories/equipments-repository";

async function getEquipments(userId: number): Promise<PartialEquipment[]> {
  const allEquipmentByUserId = await equipmentsRepository.getEquipments(userId);

  return allEquipmentByUserId;
}

async function nameConflict(name: string) {
  const equipmentByName = await equipmentsRepository.findEquipmentByName(name);

  if (equipmentByName) throw conflictError("this equipment already exist");
}

async function equipmentExistsOrError(equipmentId: number) {
  const equipmentById = await equipmentsRepository.findEquipmentById(
    equipmentId
  );

  if (!equipmentById) throw notFoundError();
}

async function createEquipment(userId: number, body: PartialEquipment) {
  await nameConflict(body.name);

  const createdEquipment = await equipmentsRepository.createEquipment(
    userId,
    body
  );

  return createdEquipment;
}

async function updateEquipment(body: UpdateType, equipmentId: number) {
  await equipmentExistsOrError(equipmentId);

  await equipmentsRepository.updateEquipment(body, equipmentId);
}

async function deleteEquipment(equipmentId: number) {
  await equipmentExistsOrError(equipmentId);

  await equipmentsRepository.deleteEquipment(equipmentId);
}

export type PartialEquipment = Omit<
  Equipment,
  "userId" | "createdAt" | "updatedAt"
>;

export type UpdateType = Pick<Equipment, "quantity" | "price" >;

export const equipmentsServices = {
  getEquipments,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
