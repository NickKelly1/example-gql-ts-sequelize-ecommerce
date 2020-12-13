import { BaseContext } from "../common/contexts/base-context";
import { Can, ICheck } from "../common/helpers/check";

export class ProductPolicy {
  constructor(
    protected readonly ctx: BaseContext,
  ) {
    //
  }

  canFindOne(): ICheck {
    return Can;
  }

  canUpdate(): ICheck {
    return Can;
  }

  canSoftDelete(): ICheck {
    return Can;
  }
}
