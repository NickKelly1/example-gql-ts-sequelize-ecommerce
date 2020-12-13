import { Request, Response } from 'express';
import { Auth } from '../classes/auth';
import { UniversalServiceContainer } from "../container/universal-service-container";
import { BaseContext } from "./base-context";

export class HttpContext extends BaseContext {
  constructor(
    public readonly req: Request,
    public readonly res: Response,
    universal: UniversalServiceContainer,
    auth: Auth,
  ) {
    super(universal, null, auth);
  }
}
