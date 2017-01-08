import Failure from './failure';
/* tslint:disable:ordered-imports */
import Option from '../option/option';
/* tslint:enable */
import Try from './try';

class Success<A> implements Try<A> {
  private value: A;

  get isFailure(): boolean {
    return false;
  }

  get isSuccess(): boolean {
    return true;
  }

  constructor(value: A) {
    this.value = value;
  }

  equals<B>(other: Try<B>): boolean {
    return (other instanceof Success) && this.value === other.value;
  }

  filter(predicate: (value: A) => boolean): Try<A> {
    if (predicate(this.value)) {
      return this;
    }
    else {
      return new Failure<A>(new Error('asdf'));
    }
  }

  flatMap<B>(f: (value: A) => Try<B>): Try<B> {
    return f(this.value);
  }

  foreach(run: (value: A) => void): void {
    run(this.value);
  }

  get(): A {
    return this.value;
  }

  getOrElse<B, A extends B>(this: Success<A>, defaultValue: () => B): B {
    return this.value;
  }

  map<B>(f: (value: A) => B): Try<B> {
    return new Success(f(this.value));
  }

  match<B>(matcher: { Success: (a: A) => B, Failure: () => B }): B {
    return matcher.Success(this.value);
  }

  orElse<B, A extends B>(this: Success<A>, alternative: () => Try<B>): Try<B> {
    return this;
  }

  recover(fn: (error: Error) => A): Try<A> {
    return this;
  }

  recoverWith(fn: (error: Error) => Try<A>): Try<A> {
    return this;
  }

  toOption(): Option<A> {
    return Option(this.value);
  }
}

export default Success;
