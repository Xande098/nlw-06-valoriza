import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

  // Receber o token
  const authToken = request.headers.authorization;

  // Validar se o token está preenchido
if(!authToken) {
  return response.status(401).end();
}

const [, token] = authToken.split(" ");

try {
  // Validar se o token é válido
  const { sub } = verify(token, "c556c507dfa28741c903b1d6ff7f05fa") as IPayload;
  
  // Recuperar informações do usuário
  request.user_id = sub;

  return next();
} catch (err) {
  return response.status(401).end();
}



}
