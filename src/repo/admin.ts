import { prisma } from '../db';

export class AdminRepository {
  async findByUsername(username: string) {
    return prisma.admin.findUnique({ where: { username } });
  }
}