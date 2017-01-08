import None from '../option/none';
import Option from '../option/option';
import Try from './try';

class Failure<A> implements Try<A> {
  private error: Error;

  get isFailure(): boolean {
    return true;
  }

  get isSuccess(): boolean {
    return false;
  }

  constructor(error: Error) {
    this.error = error;
  }

  equals<B>(other: Try<B>): boolean {
    return (other instanceof Failure) && this.error === other.error;
  }

  filter(predicate: (value: A) => boolean): Try<A> {
    return this;
  }

  flatMap<B>(f: (value: A) => Try<B>): Try<B> {
    return new Failure<B>(this.error);
  }

  foreach(run: (value: A) => void): void {
    // :TRICKY: Don't run it.
  }

  get(): A {
    throw this.error;
  }

  getOrElse<B, A extends B>(this: Failure<A>, defaultValue: () => B): B {
    return defaultValue();
  }

  map<B>(f: (value: A) => B): Try<B> {
    return new Failure<B>(this.error);
  }

  match<B>(matcher: { Success: (a: A) => B, Failure: () => B }): B {
    return matcher.Failure();
  }

  orElse<B, A extends B>(this: Failure<A>, alternative: () => Try<B>): Try<B> {
    return alternative();
  }

  recover(fn: (error: Error) => A): Try<A> {
    return Try(() => fn(this.error));
  }

  recoverWith(fn: (error: Error) => Try<A>): Try<A> {
    return fn(this.error);
  }

  toOption(): Option<A> {
    return None;
  }
}

export default Failure;
