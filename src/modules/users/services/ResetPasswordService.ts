import { inject, injectable } from 'tsyringe'
import { addHours, isAfter } from 'date-fns';

import IUserRepository from '../repositories/IUserRepository'
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  token: string,
  password: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
    ) {}

  public async execute({token, password}: Request): Promise<void>{
    const userToken = await this.userTokenRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User token doesnt exist')
    }

    const user = await this.usersRepository.findByID(userToken?.user_id)

    if(!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2)

    console.log(tokenCreatedAt)

    if(isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);

}
}
export default ResetPasswordService;
