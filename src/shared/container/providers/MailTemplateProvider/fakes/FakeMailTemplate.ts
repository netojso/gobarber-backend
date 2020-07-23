import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'

class FakeMailTemplate implements IMailTemplateProvider {
  public async parse({template}: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplate;
