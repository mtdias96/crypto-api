import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";

export function APIKey () {
  return (request: Request, response: Response, next: NextFunction) => {
    request.headers['X-MBX-APIKEY'] = env.apiKey;
}
}