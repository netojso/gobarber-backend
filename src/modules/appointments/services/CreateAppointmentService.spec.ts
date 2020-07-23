import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError'


describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    const appointment = await createAppointment.execute({
      date: new Date,
      barber_id: '11111'
    })

    expect(appointment).toHaveProperty('date');
    expect(appointment.barber_id).toBe('11111')
  });

  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRepository);

    const appointmentDate = new Date(2020, 4, 10, 11);

      await createAppointment.execute({
      date: appointmentDate,
      barber_id: '11111'
    })

    expect(createAppointment.execute({
      date: appointmentDate,
      barber_id: '11111'
    })).rejects.toBeInstanceOf(AppError)

  })
})
