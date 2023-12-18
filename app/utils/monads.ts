abstract class Maybe<T> {
  abstract bind<U>(func: (value: T) => Maybe<U>): Maybe<U>
  abstract match<R1, R2>(ifJust: (value: T) => R1, ifNothing: () => R2): R1 | R2
}

export class Just<T> extends Maybe<T> {
  constructor(private value: T) {
    super()
  }

  bind<U>(func: (value: T) => Maybe<U>): Maybe<U> {
    return func(this.value)
  }

  match(ifJust: (value: T) => any, ifNothing: () => any) {
    return ifJust(this.value)
  }
}

export class Nothing<T> extends Maybe<T> {
  bind<U>(func: (value: T) => Maybe<U>): Maybe<U> {
    return new Nothing<U>()
  }
  match(ifJust: (value: T) => any, ifNothing: () => any) {
    return ifNothing()
  }
}

export const prop =
  <T extends Object, K extends keyof T>(p: K) =>
  (obj: T | undefined): Maybe<T[K]> => {
    if (p !== undefined && obj !== undefined) {
      return new Just(obj[p])
    }
    return new Nothing()
  }
