import { RoomRepository } from './room';
import { BookingRepository } from './booking';
import { AdminRepository } from './admin';

export class RepositoryFactory {
  static getRepository(type: 'ROOM' | 'BOOKING' | 'ADMIN') {
    switch (type) {
      case 'ROOM':
        return new RoomRepository();
      case 'BOOKING':
        return new BookingRepository();
      case 'ADMIN':
        return new AdminRepository();
      default:
        throw new Error("repo unknown");
    }
  }
}