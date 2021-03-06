import { Request, Response} from 'express'
import {parseISO} from 'date-fns';
import {container} from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

export default class AppointmentsController  {
  public async create(request: Request, response: Response ): Promise<Response> {
    const {barber_id, date} = request.body;
    const parsedDate = parseISO(date)

    const createdAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createdAppointment.execute({
      barber_id,
      date: parsedDate
  })
  return response.json(appointment)

  }
}
