import None from './none';
import Some from './some';

interface Option<A> {
  isDefined: boolean;
  isEmpty: boolean;

  equals<B>(other: Option<B>): boolean;
  filter(predicate: (value: A) => boolean): Option<A>;
  filterNot(predicate: (value: A) => boolean): Option<A>;
  flatMap<B>(flatMapper: (value: A) => Option<B>): Option<B>;
  foreach(run: (value: A) => void): void;
  get(): A;
  getOrElse<B, A extends B>(this: Option<A>, defaultValue: () => B): B;
  map<B>(mapper: (value: A) => B): Option<B>;
  match<B>(matcher: { Some: (a: A) => B, None: () => B }): B;
  orElse<B, A extends B>(this: Option<A>, alternative: () => Option<B>): Option<B>;
}

/* tslint:disable:no-null-keyword only-arrow-functions */
function Option<A>(value: A): Option<A> {
  if ((value === null) || (value === undefined)) {
    return None;
  }
  else {
    return new Some(value);
  }
}
/* tslint:enable */

export default Option;
