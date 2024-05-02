import { hash } from "bcryptjs";
import { AccountAreadyExists } from "../../errors/AccountAlreadyExists";
import { prismaClient } from "../../libs/prismaClient";

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  constructor(private readonly salt: number){}

  async execute({ email, name, password }: IInput): Promise<IOutput> {
    const accountAreadyExists = await prismaClient.account.findUnique({
      where: { email }
    });

    if(accountAreadyExists){
      throw new AccountAreadyExists();
    }
    const hashedPassword = await hash(password, this.salt)

    await prismaClient.account.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })
  }
}