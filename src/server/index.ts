import express from 'express';
import cors from '../app/middlewares/cors';
import { makeSignInController } from '../factories/auth/makeSignInController';
import { makeSignUpController } from '../factories/auth/makeSignUpController';
import { routeAdapter } from './adapters/routeAdapter';

const app = express()

app.use(express.json())

app.use(cors)

app.post('/signup', routeAdapter(makeSignUpController()))

app.post('/signin',  routeAdapter(makeSignInController()))
  


app.listen(3001, () => {
  console.log("Server started at http://localhost:3001");
})