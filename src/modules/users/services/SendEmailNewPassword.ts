import { inject, injectable } from 'tsyringe'
import path from 'path'
import IUsersRepository from '../repositories/IUsersRepository'
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';


interface Request {
  email: string
}

@injectable()
class SendEmailNewPassword {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokensRepository
    ) {}

  public async execute({email}: Request): Promise<void>{
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exist', 401)
    }

    const {token} = await this.userTokenRepository.generate(user.id)

    const forgotPasswordTemplate = path.resolve(
      __dirname, '..', 'views', 'forgot_password.hbs')

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Gobarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      }
    })
  }
}

export default SendEmailNewPassword;
