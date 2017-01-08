import {AssertContext, test} from 'ava';
import Failure from '../../src/try/failure';
import None from '../../src/option/none';
import Success from '../../src/try/success';

const failure: Failure<string> = new Failure<string>(new Error('opensesame'));

test('Failure#isFailure', (t: AssertContext) => {
  t.true(failure.isFailure);
});

test('Failure#isSuccess', (t: AssertContext) => {
  t.false(failure.isSuccess);
});

test('Failure#filter', (t: AssertContext) => {
  t.is(
    failure.filter((v: String) => v === 'hello'),
    failure
  );
});

test('Failure#flatMap', (t: AssertContext) => {
  t.deepEqual(
    failure.flatMap(() => new Success('world')),
    failure
  );
});

test('Failure#foreach', (t: AssertContext) => {
  let executions: number = 0;

  failure.foreach(() => { executions += 1; });

  t.is(executions, 0);
});

test('Failure#get', (t: AssertContext) => {
  try {
    failure.get();
    t.fail();
  }
  catch (e) {
    t.pass();
  }
});

test('Failure#getOrElse', (t: AssertContext) => {
  t.is(
    failure.getOrElse(() => 'hello'),
    'hello'
  );
});

test('Failure#map', (t: AssertContext) => {
  t.deepEqual(
    failure.map((v: string) => v + 'world'),
    failure
  );
});

test('Failure#match', (t: AssertContext) => {
  t.is(
    failure.match({
      Success: (v: string): string => v,
      Failure: (): string => 'world'
    }),
    'world'
  );
});

test('Failure#orElse', (t: AssertContext) => {
  t.deepEqual(
    failure.orElse(() => new Success('world')),
    new Success('world')
  );
});

test('Failure#recover', (t: AssertContext) => {
  t.deepEqual(
    failure.recover((error: Error) => 'world'),
    new Success('world')
  );
});

test('Failure#recoverWith', (t: AssertContext) => {
  t.deepEqual(
    failure.recoverWith((error: Error) => new Success('world')),
    new Success('world')
  );
});

test('Failure#toOption', (t: AssertContext) => {
  t.is(
    failure.toOption(),
    None
  );
});
