import { inject, injectable } from 'tsyringe'

import IUserRepository from '../repositories/IUserRepository'
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';


interface Request {
  email: string
}

@injectable()
class SendEmailNewPassword {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
    ) {}

  public async execute({email}: Request): Promise<void>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exist', 401)
    }

    const {token} = await this.userTokenRepository.generate(user.id)

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Gobarber] Recuperação de senha',
      templateData: {
        template: 'Olá, {{name}}: {{token}}',
        variables: {
          name: user.name,
          token,
        }
      }
    })
  }
}

export default SendEmailNewPassword;
