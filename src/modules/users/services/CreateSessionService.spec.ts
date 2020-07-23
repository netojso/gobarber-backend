import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError'
import CreateSessionService from './CreateSessionService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let sessionUser: CreateSessionService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    sessionUser = new CreateSessionService(fakeUserRepository, fakeHashProvider);
  })

  it('should be able to authenticate a user', async () => {
    const user = await createUser.execute({
      name: 'Octacilio Serafim',
      email: 'netojso@gmail.com',
      password: '123456'
    })

    const response = await sessionUser.execute({
      email: 'netojso@gmail.com',
      password: '123456'
    })
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate a non existing user', async () => {
   await expect( sessionUser.execute({
      email: 'neto@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)

  });

  it('should be able to authenticate a user with wrong password', async () => {
    const user = await createUser.execute({
      name: 'Octacilio Serafim',
      email: 'netojso@gmail.com',
      password: '123456'
    })

    await expect(sessionUser.execute({
      email: 'netojso@gmail.com',
      password: '12345'
    })).rejects.toBeInstanceOf(AppError)
  });

});
