import Router from 'express';
import * as userController from '../controllers/userController.js';


const router = Router();

router.get('/users', userController.usersGetAll);
router.get('/user/:id', userController.userGetById);
router.post('/login', userController.userLogin);
router.post('/user', userController.userCreate);
router.put('/user/:id', userController.userUpdate);
router.delete('/user/:id', userController.userDelete);

export default router;