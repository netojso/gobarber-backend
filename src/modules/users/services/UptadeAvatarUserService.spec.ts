import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import UpdateAvatarUserService from './UpdateAvatarUserService'
import AppError from '@shared/errors/AppError'


describe('UpdateUser', () => {
  it('should be able to update a avatar user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateAvatarUser = new UpdateAvatarUserService(fakeUserRepository, fakeStorageProvider);

    const user = await fakeUserRepository.create({
      name: 'Octacilio Serafim',
      email: 'netojso@gmail.com',
      password: '123456'
    })

    await updateAvatarUser.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg')
  });

  it('should be able to update a avatar user not existent', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateAvatarUser = new UpdateAvatarUserService(fakeUserRepository, fakeStorageProvider);

    const user = updateAvatarUser.execute({
      user_id: 'this-user-doesnt-exist',
      avatarFilename: 'avatar.jpg'
    })

    expect(user).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to delete a last user avatar before to update', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateAvatarUser = new UpdateAvatarUserService(fakeUserRepository, fakeStorageProvider);

    const user = await fakeUserRepository.create({
      name: 'Octacilio Serafim',
      email: 'netojso@gmail.com',
      password: '123456'
    })

    await updateAvatarUser.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    await updateAvatarUser.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar2.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })

});
