import { loginUser } from '@/lib/db';
import { User } from '@/lib/models/user';
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'tajny_klic_mel_byt_env'

export class AuthenticationService {
  static async login(email: string, password: string): Promise<User | null> {
    const user = await loginUser(email, password);
    return user;
  }
  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      return decoded 
    } catch {
      return null
    }
  }
}