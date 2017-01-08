import {default as _Option} from './option/option';
import {default as _Try} from './try/try';

class Monapt {
  /* tslint:disable:variable-name */
  static Option: typeof _Option = _Option;
  static Try: typeof _Try = _Try;
  /* tslint:enable:variable-name */

  private constructor() {
    // :KLUDGE: Do nothing, we're using this class as a namespace.
  }
}

export default Monapt;
