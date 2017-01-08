import Option from '../option/option';
import Failure from './failure';
import Success from './success';

interface Try<A> {
  isFailure: boolean;
  isSuccess: boolean;
  equals<B>(other: Try<B>): boolean;
  filter(predicate: (value: A) => boolean): Try<A>;
  flatMap<B>(f: (value: A) => Try<B>): Try<B>;
  foreach(run: (value: A) => void): void;
  get(): A;
  getOrElse<B, A extends B>(this: Try<A>, defaultValue: () => B): B;
  map<B>(f: (value: A) => B): Try<B>;
  match<B>(matcher: { Success: (a: A) => B, Failure: () => B }): B;
  orElse<B, A extends B>(this: Try<A>, alternative: () => Try<B>): Try<B>;
  recover(fn: (error: Error) => A): Try<A>;
  recoverWith(fn: (error: Error) => Try<A>): Try<A>;
  toOption(): Option<A>;
}

/* tslint:disable:no-null-keyword only-arrow-functions */
function Try<A>(fn: () => A): Try<A> {
  try {
    return new Success(fn());
  }
  catch (e) {
    return new Failure<A>(e);
  }
}
/* tslint:enable */

export default Try;
