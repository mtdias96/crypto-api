import express from 'express';
import { SignInController } from '../app/controllers/SignInController';
import { SignUpController } from '../app/controllers/SignUpController';
import { SignInUseCase } from '../app/useCases/auth/SignInUseCase';
import { SignUpUseCase } from '../app/useCases/auth/SignUpUseCase';

const app = express()

app.use(express.json())

app.post('/signup', async (request, response) => {
 const SALT = 10 
 const signUpUseCase = new SignUpUseCase(SALT) 
 const signUpController = new SignUpController(signUpUseCase)

 const {statusCode, body} = await signUpController.handle({
  body: request.body,
  headers: request.headers,
 });

 response.status(statusCode).json(body)
})


app.post('/signin', async (request, response) => {
  const signInUseCase = new SignInUseCase()
  const signInController = new SignInController(signInUseCase)

  const {statusCode, body} = await signInController.handle({
    body: request.body,
    headers: request.headers,
   });
   response.status(statusCode).json(body)
})

app.listen(3001, () => {
  console.log("Server started at http://localhost:3001");
})