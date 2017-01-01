import {default as _Option} from './option/option';

class Monapt {
  /* tslint:disable:variable-name */
  static Option: typeof _Option = _Option;
  /* tslint:enable:variable-name */

  private constructor() {
    // :KLUDGE: Do nothing, we're using this class as a namespace.
  }
}

export default Monapt;
