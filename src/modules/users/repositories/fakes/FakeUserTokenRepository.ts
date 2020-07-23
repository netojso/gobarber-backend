import IUserTokenRepository from '../IUserTokenRepository';
import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import AppError from '@shared/errors/AppError';

class FakeUserTokenRepository implements IUserTokenRepository {
  private userTokens: UserToken[] = []

    public async generate(user_id: string): Promise<UserToken> {
      const userToken = new UserToken();

      Object.assign(userToken, {
        id: uuid(),
        token: uuid(),
        user_id,
        created_at: new Date(),
        update_at: new Date()
      })

      this.userTokens.push(userToken);

      return userToken
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {

      const user = await this.userTokens.find(
        findToken => findToken.token === token)

      if(!user) {
        throw new AppError('User doesnt exist, check the token', 401)
      }

      return user
    }
}

export default FakeUserTokenRepository;
