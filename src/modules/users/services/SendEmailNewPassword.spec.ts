import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import SendEmailNewPassword from './SendEmailNewPassword';
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendEmailNewPassword: SendEmailNewPassword;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendEmailNewPassword = new SendEmailNewPassword(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    )
  })
  it('should be able to recover the password using email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUserRepository.create({
      name: 'Octacilio Serafim',
      email: 'netojso@gmail.com',
      password: '123456'
    })

    await sendEmailNewPassword.execute({
      email: 'netojso@gmail.com'
    })
    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user', async () => {

    await expect(
      sendEmailNewPassword.execute({email: 'netojso@gmail.com'}))
    .rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a request token to recover password', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'Octacilio Serafim',
      email: 'netojso@gmail.com',
      password: '123456'
    })

    await sendEmailNewPassword.execute({
      email: 'netojso@gmail.com'
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  });

})
