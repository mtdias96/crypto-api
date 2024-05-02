import { SignUpController } from "../../app/controllers/SignUpController";
import { makeSingUpUseCase } from "./makeSignUpUseCase";

export function makeSignUpController(){
  const signUpUseCase = makeSingUpUseCase()
  return new SignUpController(signUpUseCase)
  
}