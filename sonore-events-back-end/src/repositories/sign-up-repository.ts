import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const signUpRepository = {
  findByEmail,
  create,
};

export default signUpRepository;
