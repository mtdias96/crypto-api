import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '../../config/env';
import { InvalidCredentials } from '../../errors/InvalidCredentials';
import { prismaClient } from "../../libs/prismaClient";

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accessToken: string;
  userId: string;
  username: string;
}

export class SignInUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email },
    });

    if (!account) {
      throw new InvalidCredentials();
    }

    const isPassWordValid = await compare(password, account.password)

    if (!isPassWordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      {
        sub: account.id,
        username: account.name
      },
      env.jwtSecret,
      { expiresIn: '1d' },
    );

    return {
      accessToken,
      userId: account.id,
      username: account.name
    };
  }
}