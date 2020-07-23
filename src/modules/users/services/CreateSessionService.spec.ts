import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError'
import CreateSessionService from './CreateSessionService';


describe('AuthenticateUser', () => {
  it('should be able to authenticate a user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const sessionUser = new CreateSessionService(fakeUserRepository, fakeHashProvider);

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
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const sessionUser = new CreateSessionService(fakeUserRepository, fakeHashProvider)

    expect( sessionUser.execute({
      email: 'neto@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)

  });

    it('should be able to authenticate a user with wrong password', async () => {
      const fakeUserRepository = new FakeUsersRepository();
      const fakeHashProvider = new FakeHashProvider();

      const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
      const sessionUser = new CreateSessionService(fakeUserRepository, fakeHashProvider);

      const user = await createUser.execute({
        name: 'Octacilio Serafim',
        email: 'netojso@gmail.com',
        password: '123456'
      })

      expect(sessionUser.execute({
        email: 'netojso@gmail.com',
        password: '12345'
      })).rejects.toBeInstanceOf(AppError)
    });

});
