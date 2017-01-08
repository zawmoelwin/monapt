import {AssertContext, test} from 'ava';
import Failure from '../../src/try/failure';
import Some from '../../src/option/some';
import Success from '../../src/try/success';
import Try from '../../src/try/try';

const success: Try<string> = new Success('hello');

test('Success#isFailure', (t: AssertContext) => {
  t.false(success.isFailure);
});

test('Success#isSuccess', (t: AssertContext) => {
  t.true(success.isSuccess);
});

test('Success#filter', (t: AssertContext) => {
  t.is(
    success.filter((v: string) => v === 'hello'),
    success
  );
  t.deepEqual(
    success.filter((v: string) => v === 'world'),
    new Failure<string>(new Error('asdf'))
  );
});

test('Success#flatMap', (t: AssertContext) => {
  t.deepEqual(
    success.flatMap(() => new Success('world')),
    new Success('world')
  );
});

test('Success#foreach', (t: AssertContext) => {
  let executions: number = 0;

  success.foreach(() => { executions += 1; });

  t.is(executions, 1);
});

test('Success#get', (t: AssertContext) => {
  try {
    t.is(
      success.get(),
      'hello'
    );
  }
  catch (e) {
    t.fail();
  }
});

test('Success#getOrElse', (t: AssertContext) => {
  t.is(
    success.getOrElse(() => 'world'),
    'hello'
  );
});

test('Success#map', (t: AssertContext) => {
  t.deepEqual(
    success.map((v: string) => v + 'world'),
    new Success('helloworld')
  );
});

test('Success#match', (t: AssertContext) => {
  t.is(
    success.match({
      Success: (v: string): string => v,
      Failure: (): string => 'world'
    }),
    'hello'
  );
});

test('Success#orElse', (t: AssertContext) => {
  t.deepEqual(
    success.orElse(() => new Success('world')),
    new Success('hello')
  );
});

test('Success#recover', (t: AssertContext) => {
  t.is(
    success.recover((error: Error) => 'world'),
    success
  );
});

test('Success#recoverWith', (t: AssertContext) => {
  t.deepEqual(
    success.recoverWith((error: Error) => new Success('world')),
    success
  );
});

test('Success#toOption', (t: AssertContext) => {
  t.deepEqual(
    success.toOption(),
    new Some('hello')
  );
});
