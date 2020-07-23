import {Request, Response} from 'express';
import {container} from 'tsyringe';

import SendEmailNewPassword from '@modules/users/services/SendEmailNewPassword';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendEmailNewPassword = container.resolve(SendEmailNewPassword)

    await sendEmailNewPassword.execute({
      email
    })

    return response.status(204).json()
  }}
