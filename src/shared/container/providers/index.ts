
import { container } from 'tsyringe';
import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '../providers/StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from '../providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from '../providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailProvider from '../providers/MailTemplateProvider/implementations/HandlebarsMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider', DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider', HandlebarsMailProvider
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)
