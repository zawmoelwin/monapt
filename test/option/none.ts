import {AssertContext, test} from 'ava';

import None from '../../src/option/none';
import Option from '../../src/option/option';

test('None#isDefined', (t: AssertContext) => {
  t.false(None.isDefined);
});

test('None#isEmpty', (t: AssertContext) => {
  t.true(None.isEmpty);
});

test('None#equals', (t: AssertContext) => {
  t.true(None.equals(None));
  t.false(None.equals(Option(1)));
});

test('None#filter', (t: AssertContext) => {
  t.is(
    None.filter(() => true),
    None
  );
  t.is(
    None.filter(() => false),
    None
  );
});

test('None#filterNot', (t: AssertContext) => {
  t.is(
    None.filter(() => true),
    None
  );
  t.is(
    None.filter(() => false),
    None
  );
});

test('None#flatMap', (t: AssertContext) => {
  t.deepEqual(
    None.flatMap(() => Option('hello')),
    None
  );
});

test('None#foreach', (t: AssertContext) => {
  let executions: number = 0;

  None.foreach(() => { executions += 1; });

  t.is(executions, 0);
});

test('None#get', (t: AssertContext) => {
  try {
    None.get();
    t.fail()
  }
  catch (e) {
    t.pass();
  }
});

test('None#getOrElse', (t: AssertContext) => {
  t.is(
    None.getOrElse(() => 'hello'),
    'hello'
  );
});

test('None#map', (t: AssertContext) => {
  t.deepEqual(
    None.map((v: never) => 'hello'),
    None
  );
});

test('None#match', (t: AssertContext) => {
  t.is(
    None.match({
      Some: (): string => 'hello',
      None: (): string => 'world'
    }),
    'world'
  );
});

test('None#orElse', (t: AssertContext) => {
  t.deepEqual(
    None.orElse(() => Option('hello')),
    Option('hello')
  );
});
