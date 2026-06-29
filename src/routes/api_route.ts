import { Router } from 'express';
import { BookingFacade } from '../services/booking_facade';
import { AuthService } from '../services/auth';
import { RoomRepository } from '../repo/room';
import { BookingRepository } from '../repo/booking';
import { RepositoryFactory } from '../repo/repo_factory';
import { authenticateJWT } from '../middleware/auth';

const router = Router();
const bookingFacade = new BookingFacade();
const authService = new AuthService();
const roomRepo = RepositoryFactory.getRepository('ROOM') as RoomRepository;
const bookingRepo = RepositoryFactory.getRepository('BOOKING') as BookingRepository;

// 1. See all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await bookingFacade.getAvailableRooms();
    res.json(rooms);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// 2. User booking
router.post('/bookings', async (req, res) => {
  try {
    const newBooking = await bookingFacade.processBooking(req.body);
    res.status(201).json({ message: 'Booking successful!', data: newBooking });
  } catch (error: any) {
    res.status(400).json({ error: error.message }); 
  }
});

// 3. Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// 4. Admin see all bookings
router.get('/admin/bookings', authenticateJWT, async (req, res) => {
  try {
    const bookings = await bookingRepo.findAll();
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// 5. Admin add a new room
router.post('/admin/rooms', authenticateJWT, async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const newRoom = await roomRepo.create({ name, price: Number(price), imageUrl });
    res.status(201).json(newRoom);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to add new room" });
  }
});

// 6. Admin delete checked-out room
router.delete('/admin/bookings/:id', authenticateJWT, async (req, res) => {
  try {
    await bookingRepo.delete(Number(req.params.id));
    res.json({ message: 'Booking completed' });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to complete booking or booking not found" });
  }
});

// 7. Admin update room
router.put('/admin/rooms/:id', authenticateJWT, async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    if (price < 0) return res.status(400).json({ error: "price must not be in minus" });
    
    const updatedRoom = await roomRepo.update(Number(req.params.id), { name, price: Number(price), imageUrl });
    res.json(updatedRoom);
  } catch (error: any) {
    res.status(400).json({ error: "update failed" });
  }
});

export default router;