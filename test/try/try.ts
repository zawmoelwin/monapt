import {AssertContext, test} from 'ava';
import Success from '../../src/try/success';
import Try from '../../src/try/try';
import Failure from '../../src/try/failure';

test('Try#apply', (t: AssertContext) => {
  t.deepEqual(
    Try(() => 'hello'),
    new Success('hello')
  );

  t.deepEqual(
    Try((): void => { throw new Error('hello'); }),
    new Failure<never>(new Error('hello'))
  );
});
