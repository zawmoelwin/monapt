import Option from './option';

class None<A> implements Option<A> {
  static get INSTANCE(): None<never> {
    return new None<never>();
  }

  get isDefined(): boolean {
    return false;
  }

  get isEmpty(): boolean {
    return true;
  }

  private constructor() {
    // :TRICKY: We don't want to do anything except mark constructor as private.
  }

  equals<B>(other: Option<B>): boolean {
    return (other instanceof None);
  }

  filter(predicate: (value: A) => boolean): Option<A> {
    return this;
  }

  filterNot(predicate: (value: A) => boolean): Option<A> {
    return this;
  }

  flatMap<B>(flatMapper: (value: A) => Option<B>): Option<B> {
    return None.INSTANCE;
  }

  foreach(run: (value: A) => void): void {
    // :TRICKY: Don't do anything.
  }

  get(): A {
    throw new Error('asdl;gkajsg');
  }

  getOrElse<B, A extends B>(this: None<A>, defaultValue: () => B): B {
    return defaultValue();
  }

  map<B>(mapper: (value: A) => B): Option<B> {
    return None.INSTANCE;
  }

  match<B>(matcher: { Some: (a: A) => B, None: () => B }): B {
    return matcher.None();
  }

  orElse<B, A extends B>(this: None<A>, alternative: () => Option<B>): Option<B> {
    return alternative();
  }
}

// :KLUDGE: Can't directly export this, TypeScript gets confused by the namespace.
const toExport: None<never> = None.INSTANCE;

export default toExport;
