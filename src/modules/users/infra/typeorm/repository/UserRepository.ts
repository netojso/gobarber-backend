import User from '../entities/Users'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import { Repository, getRepository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }
      public async findByID(id: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne(id);

        return user
      }

      public async findByEmail(email: string): Promise<User | undefined> {
      const user = this.ormRepository.findOne({
        where: {email}
      });

         return user
      }


      public async create(userData: ICreateUserDTO): Promise<User> {
        console.log('oioioio')
        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user)

        return user;
      }

      public async save(user: User): Promise<User> {
          return this.ormRepository.save(user)
      }
}

export default UserRepository;
