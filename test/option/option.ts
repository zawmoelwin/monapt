import {AssertContext, test} from 'ava';

import None from '../../src/option/none';
import Option from '../../src/option/option';
import Some from '../../src/option/some';

test('Option#apply', (t: AssertContext) => {
  t.deepEqual(
    Option('hello'),
    new Some('hello')
  );

  /* tslint:disable:no-null-keyword */
  t.deepEqual(
    Option(null),
    None
  );
  /* tslint:enable */

  t.deepEqual(
    Option(undefined),
    None
  );
});
