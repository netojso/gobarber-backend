import IHashProvider from '../models/IHashProvider';
import { hash, compare } from 'bcryptjs';

class BCryptProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  };

  public async compareHash(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed)
  }
}

export default BCryptProvider;
