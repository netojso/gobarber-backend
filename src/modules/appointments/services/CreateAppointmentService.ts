import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import {startOfHour} from 'date-fns'
import { inject, injectable } from 'tsyringe';
import AppError from "@shared/errors/AppError";
import IAppointmentRepository from '../repositories/IAppointmentsRepository';

interface Request {
  barber_id: string,
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository) {}

  public async execute({date, barber_id}: Request): Promise<Appointment> {
      const appointmentDate = startOfHour(date);

      const findAppointmentSameData = await this.appointmentsRepository.findByDate(
        appointmentDate,
        );

        if(findAppointmentSameData) {
          throw new AppError('Appointment is already booked')
        }

        const appointment = await this.appointmentsRepository.create({
          barber_id,
          date: appointmentDate
        });

        return appointment
        }
}

export default CreateAppointmentService
