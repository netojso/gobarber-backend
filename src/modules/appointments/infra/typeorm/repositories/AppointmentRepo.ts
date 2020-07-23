import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentRepository from '../../../repositories/IAppointmentsRepository';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';


@EntityRepository(Appointment)
class AppointmentsRepository implements IAppointmentRepository {
  private repository: Repository<Appointment>

  constructor() {
    this.repository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = await this.repository.findOne({
        where: { date }
      })

      return findAppointment;
  }

  public async create({barber_id, date}: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.repository.create({ barber_id, date});

    await this.repository.save(appointment)

    return appointment;
  }

}

export default AppointmentsRepository;
