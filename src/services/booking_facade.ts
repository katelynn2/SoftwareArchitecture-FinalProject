import { RoomRepository } from '../repo/room';
import { BookingRepository } from '../repo/booking';
import { RepositoryFactory } from '../repo/repo_factory';

export class BookingFacade {
  private roomRepo = RepositoryFactory.getRepository('ROOM') as RoomRepository;
  private bookingRepo = RepositoryFactory.getRepository('BOOKING') as BookingRepository;

  async processBooking(data: { 
    roomId: number; 
    customerName: string; 
    customerPhone: string; 
    checkInDate: string; 
    checkOutDate: string 
  }) {

    //validate nomor telepon
    if (!/^\d+$/.test(data.customerPhone)) {
      throw new Error("Phone number must contain only numbers.");
    }

    //validate logic tanggal
    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) throw new Error("Check-in date cannot be in the past");
    if (checkOut <= checkIn) throw new Error("Check-out date must be greater than Check-in.");

    //cek overlapping
    const isBooked = await this.bookingRepo.findOverlapping(data.roomId, checkIn, checkOut);
    if (isBooked) throw new Error("Rooms are already booked for that date range.");

    return this.bookingRepo.create({
      roomId: data.roomId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      checkInDate: checkIn,
      checkOutDate: checkOut
    });
  }

  async getAvailableRooms() {
    return this.roomRepo.findAll();
  }

}