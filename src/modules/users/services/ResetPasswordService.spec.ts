import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider
    )
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Octacilio Serafim',
      email: 'netojso@gmail.com',
      password: '123456'
    })

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    const {token} = await fakeUserTokenRepository.generate(user.id)

    await resetPasswordService.execute({
      token,
      password: '654321'
    })

    const updateUser = await fakeUserRepository.findByID(user.id);

    expect(generateHash).toHaveBeenCalledWith('654321')
    expect(updateUser?.password).toBe('654321');
  });

  it('should not be able to reset password with non-exisiting token', async () => {
    await expect(resetPasswordService.execute({
      token: 'token-não-existente',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to reset password with non-exisiting user', async () => {
    const {token} = await fakeUserTokenRepository.generate('non-existent-user')

    await expect(resetPasswordService.execute({
      token: token,
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to reset password after 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'Octacilio Serafim',
      email: 'netojso@gmail.com',
      password: '123456'
    });

    const {token} = await fakeUserTokenRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const date = new Date();

      return date.setHours(date.getHours() + 3)
    })

    await expect(resetPasswordService.execute({
      password: '123123',
      token,
    })).rejects.toBeInstanceOf(AppError)
  });
})
