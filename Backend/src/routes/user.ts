import { getUser, RegisterUser, updateUser } from '../controllers/user.ts';
import express from 'express';
const Router = express.Router();

Router.post('/', RegisterUser);
Router.get('/', getUser);
Router.put('/', updateUser);

export default Router;
