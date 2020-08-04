import { Request, Response } from 'express';

export function validateNewUser(req: Request, res: Response, next: Function) {
  console.log(req.body, '\n\n', res);
  return res.status(400).json({ error: 'testing mode' });
  // next();
}
