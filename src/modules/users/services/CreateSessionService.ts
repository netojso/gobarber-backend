import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface Request {
  email: string,
  password: string
}

interface Response {
  user: User,
  token: string
}

@injectable()
class CreateSessionService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
    ) {}


  public async execute({email, password}: Request) : Promise<Response> {
      const user = await this.usersRepository.findByEmail(email)
      console.log('kkkkkkkk')
      if(!user) {
        throw new AppError ('Your email/password is incorrect', 401)
      }

        const passwordVerify = await this.hashProvider.compareHash(password, user.password)

        if(!passwordVerify) {
          throw new AppError ('Your email/password is incorrect')
        }

        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
          subject: user.id,
          expiresIn,
          });

        return { user, token }
  }
}

export default CreateSessionService;
