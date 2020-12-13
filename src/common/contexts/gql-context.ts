import { Request, Response } from 'express';
import { Auth } from '../classes/auth';
import { RequestServiceContainer } from '../container/request-service-container';
import { UniversalServiceContainer } from "../container/universal-service-container";
import { BaseContext } from "./base-context";
import { HttpContext } from "./http-context";

export class GqlContext extends BaseContext {
  static fromHttpContext(httpCtx: HttpContext) {
    return new GqlContext(httpCtx.universal, httpCtx.services, httpCtx.auth, httpCtx);
  }

  constructor(
    universal: UniversalServiceContainer,
    services: null | RequestServiceContainer,
    auth: Auth,
    protected readonly httpCtx: null | HttpContext,
  ) {
    super(universal, services, auth);
  }
}
