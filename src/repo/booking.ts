import { prisma } from '../db';

export class BookingRepository {
  async findAll() {
    return prisma.booking.findMany({ include: { room: true } }); 
  }

  async create(data: { roomId: number; customerName: string; customerPhone: string; checkInDate: Date; checkOutDate: Date }) {
    return prisma.booking.create({ data });
  }

  async findOverlapping(roomId: number, checkIn: Date, checkOut: Date) {
    return prisma.booking.findFirst({
      where: {
        roomId: roomId,
        AND: [
          { checkInDate: { lt: checkOut } },
          { checkOutDate: { gt: checkIn } }
        ]
      }
    });
  }

  async delete(id: number) {
    return prisma.booking.delete({ where: { id } });
  }
}