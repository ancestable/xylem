import { ImmutabilityHelper } from '../utils/helper/immutabilityHelper';

export abstract class BaseFormatter {
  id: string;
  _id: string;

  protected format(args: any = {}): void {
    if (typeof args.toJSON === 'function') args = args.toJSON();
    Object.keys(this).forEach(key => {
      if (args[key] !== undefined) this[key] = ImmutabilityHelper.copy(args[key]);
    });
    if (args._id) this.id = this._id = args._id;
  }
}