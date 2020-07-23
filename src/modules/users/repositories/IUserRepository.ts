import User from '../infra/typeorm/entities/Users'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IAppointmentRepository {
  create(data: ICreateUserDTO): Promise<User>
  findByID(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
