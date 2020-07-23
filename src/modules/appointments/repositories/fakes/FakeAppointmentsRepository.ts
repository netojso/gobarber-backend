import { uuid } from 'uuidv4'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointments from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import { isEqual } from 'date-fns';


class AppointmentsRepository implements IAppointmentRepository {
    private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(
      result =>  isEqual(result.date, date)
    )

    return appointment
  }

  public async create({barber_id, date}: ICreateAppointments): Promise<Appointment> {
   const appointment = new Appointment();

   Object.assign(appointment, {id: uuid(), date, barber_id})

   this.appointments.push(appointment)

   return appointment
  }

}

export default AppointmentsRepository;
