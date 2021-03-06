import IUserRepository from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import User from '@modules/users/infra/typeorm/entities/Users';
import { uuid } from 'uuidv4';

class FakeUserRepository implements IUserRepository {
  private users: User[] = []

    public async findByID(id: string): Promise<User | undefined> {
      const user = this.users.find(item => item.id === id)

      return user
    }

    public async findByEmail(email: string): Promise<User | undefined> {
      const user = this.users.find(item => item.email === email)

      return user
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
      const user = new User();

      Object.assign(user, {id: uuid()}, userData)

      this.users.push(user);

      return user
    }


    public async save(user: User): Promise<User> {
      const findIndex = this.users.findIndex(item => item.id === user.id)

      this.users[findIndex] = user;

      return user

    }


}

export default FakeUserRepository;
