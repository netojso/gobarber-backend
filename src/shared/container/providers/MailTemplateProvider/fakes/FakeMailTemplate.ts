import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplate implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Main content';
  }
}

export default FakeMailTemplate;
