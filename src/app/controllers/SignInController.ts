import { ZodError, z } from "zod";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { IController, IRequest, IResponse } from "../interfaces/IController";
import { SignInUseCase } from '../useCases/auth/SignInUseCase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

 async handle({body, headers}: IRequest): Promise<IResponse> {

  console.log(headers);
   try{
    const { email, password} = schema.parse(body);

    const {accessToken, userId, username} = await this.signInUseCase.execute({email, password,})

    return {
      statusCode: 200,
      body: {
        sucess: true,
        data: {
          accessToken,
          userId,
          username
        }
      },
    };
   }catch (error){
    if(error instanceof ZodError )
      return {
        statusCode: 400,
        body: error.issues,
    };
    if(error instanceof InvalidCredentials){
     return {
       statusCode: 401,
       body: {
         error: 'Invalid credentials'
       }
     }
    }
      throw error;
   }

  }

}