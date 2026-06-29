import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RepositoryFactory } from '../repo/repo_factory';
import { AdminRepository } from '../repo/admin';

export const JWT_SECRET = process.env.JWT_SECRET || 'secret-key-homestay';

export class AuthService {
  private adminRepo = RepositoryFactory.getRepository('ADMIN') as AdminRepository;

  async login(username: string, password: string) {
    const admin = await this.adminRepo.findByUsername(username);
    if (!admin) throw new Error('Username not found');

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) throw new Error('Wrong password');

    const token = jwt.sign({ id: admin.id, role: 'ADMIN' }, JWT_SECRET, { expiresIn: '1d' });
    return token;
  }
}