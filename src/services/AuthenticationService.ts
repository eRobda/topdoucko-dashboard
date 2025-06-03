import { loginUser } from '@/lib/db';
import { User } from '@/lib/models/user';

export class AuthenticationService {
  static async login(email: string, password: string): Promise<User | null> {
    const user = await loginUser(email, password);
    return user;
  }
}