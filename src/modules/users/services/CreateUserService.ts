import User from '@modules/users/infra/typeorm/entities/Users'
import {inject, injectable} from 'tsyringe'
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


interface Request {
  name: string,
  email: string,
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
    ) {}

  public async execute({name , email, password} : Request) : Promise<User> {
    console.log('service')
      const checkUserExists = await this.usersRepository.findByEmail(email)

      if (checkUserExists) {
        throw new AppError ('Email address already exists');
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      const user = await this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
      })

      await this.usersRepository.save(user)

      return user

  }
}

export default CreateUserService;