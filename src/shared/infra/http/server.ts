import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import cors from 'cors';

import routes from '@shared/infra/http/routes/index'
import '@shared/infra/typeorm/'
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder))
app.use(routes);

app.use(
  (err: AppError, request: Request, response: Response, next: NextFunction) => {

    if(err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message
      })
    }

})
app.listen(3333, () => {
  console.log('Server running na porta 3333')
})
