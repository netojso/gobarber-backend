import {Router} from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController';


import uploadConfig from '@config/upload';
import multer from 'multer';


const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create)

usersRouter.patch('/avatar',
ensureAuthenticated,
upload.single('avatar'),
usersAvatarController.update)
export default usersRouter;
