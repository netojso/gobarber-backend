import {container} from 'tsyringe'

import '@modules/users/providers'
import './providers'

// import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
// import BCryptProvider from '@modules/users/providers/HashProvider/implementations/BCryptProvider';

// import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';
// import DiskStorageProvider from './providers/StorageProvider/implementations/DiskStorageProvider';

// import IMailProvider from './providers/MailProvider/models/IMailProvider';
// import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepo';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repository/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repository/UserTokensRepository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository', AppointmentsRepository)

container.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepository)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository', UserTokensRepository)

