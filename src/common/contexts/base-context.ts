import { RequestServiceContainer } from "../container/request-service-container";
import httpErrors, { HttpError } from 'http-errors';
import { UniversalServiceContainer } from "../container/universal-service-container";
import { Auth } from "../classes/auth";

export abstract class BaseContext {
  // readonly auth: RequestAuth;
  // protected _services: undefined | RequestServiceContainer;


  constructor(
    public readonly universal: UniversalServiceContainer,
    protected _services: null | RequestServiceContainer,
    public readonly auth: Auth,
  ) {
  }

  /**
   * Attach services
   */
  attachServices(services: RequestServiceContainer) {
    this._services = services;
  }

  /**
   * Get request Services
   */
  get services() {
    if (this._services) return this._services;
    throw new httpErrors.InternalServerError(`Bad ${this.constructor.name} initialisation`);
  }



  /**
   * Get a NotFoundError
   *
   * Overridable
   */
  notFoundError(): HttpError {
    return new httpErrors.NotFound();
  }


  /**
   * Get a NotFoundError
   *
   * Overridable
   */
  assertFound<T>(arg: null | undefined | T): T {
    if (arg != null) return arg;
    throw this.notFoundError();
  }
}