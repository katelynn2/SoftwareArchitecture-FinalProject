import { prisma } from '../db';

export class RoomRepository {
  async findAll() {
    return prisma.room.findMany();
  }
  
  async create(data: { name: string; price: number; imageUrl?: string }) {
    return prisma.room.create({ data });
  }

  async update(id: number, data: { name: string; price: number; imageUrl?: string }) {
    return prisma.room.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.room.delete({ where: { id } });
  }
}