import { prisma } from "config/database";
import { UpdateType, PartialEquipment } from "services/equipments-services";

async function getEquipments(userId : number): Promise<PartialEquipment[]> {
    return await prisma.equipment.findMany({
        where:{
            userId
        },
        select:{
            id:true,            
            name:true,       
            type:true,
            price:true,       
            quantity:true,
            image:true
        }
    })
}

async function findEquipmentByName(name:string) {
    return await prisma.equipment.findFirst({
        where:{
            name
        }
    })
}

async function findEquipmentById(id:number) {
    return await prisma.equipment.findFirst({
        where:{
            id
        }
    })
}

async function createEquipment(userId:number,body:PartialEquipment) {
    return await prisma.equipment.create({
        data: {
          userId,
          name:body.name,
          type:body.type,
          price:body.price,
          quantity:body.quantity,
          image:body.image
        },
      });
    
}

async function updateEquipment(body: UpdateType , equipmentId: number) {
    await prisma.equipment.update({
        where:{
            id:equipmentId
        },
        data:{
            price:body.price,
            quantity:body.quantity,
        }
    })
}

async function deleteEquipment(equipmentId: number) {
    await prisma.equipment.delete({
        where:{
            id:equipmentId
        }
    })
}

export const equipmentsRepository = {
    getEquipments,
    findEquipmentByName,
    findEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
}