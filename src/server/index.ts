import express from 'express';
import { makeSignInController } from '../factories/auth/makeSignInController';
import { makeSignUpController } from '../factories/auth/makeSignUpController';
import { routeAdapter } from './adapters/routeAdapter';

const app = express()

app.use(express.json())


app.post('/signup', routeAdapter(makeSignUpController()))
app.post('/signin', routeAdapter(makeSignInController()))
app.get('/test', (_, res) => {
  const responseBody = {
    message: 'O PAi ta onnn!',
    status: 'success',
    data: { foo: 'bar' }
  };
  res.json(responseBody);
});

app.listen(3001, () => {
  console.log("Server started at http://localhost:3001");
})