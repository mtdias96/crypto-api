import { SignUpUseCase } from "../../app/useCases/auth/SignUpUseCase";

export function makeSingUpUseCase(){
  const SALT = 10;
  return new SignUpUseCase(SALT);
}