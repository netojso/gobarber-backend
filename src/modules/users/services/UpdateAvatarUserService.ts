import { inject, injectable } from 'tsyringe'

import IUserRepository from '../repositories/IUserRepository'
import User from '../infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';


interface Request {
  user_id: string,
  avatarFilename: string
}

@injectable()
class UpdateAvatarUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
    ) {}

  public async execute({user_id, avatarFilename}: Request): Promise<User>{
    const user = await this.usersRepository.findByID(user_id);

    if(!user) {
      throw new AppError('Only authenticated users can chance avatar', 401);
    }

    if (user.avatar) {
      //Deletar avatar anterior
      await this.storageProvider.deleteFile(avatarFilename)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename;

    await this.usersRepository.save(user)

    return user;
    }
  }


export default UpdateAvatarUserService;
