/**
 * Promise wrapper that returns data or error in an object format
 * @param promiseOrFunction - Any promise, async function, or function
 */
async function piwa<Data, Err extends Error>(
  promiseOrFunction: PiwaArgs<Data>
): PiwaResponse<Data, PiwaError<Err>> {
  const isValidInput =
    typeof promiseOrFunction === 'function' ||
    promiseOrFunction instanceof Promise;

  if (!isValidInput) {
    console.error(
      '[Piwa] Invalid argument. Must be: a promise, an async function, or a function'
    );
    return { data: null, error: new PiwaBadInputError() };
  }

  const _promise: Promise<Data> =
    promiseOrFunction instanceof Promise
      ? promiseOrFunction
      : typeof promiseOrFunction === 'function'
      ? (async () => promiseOrFunction())()
      : promiseOrFunction;

  return _promise
    .then((data: Data) => ({ data, error: null }))
    .catch((error: Err) => {
      return {
        error,
        data: null,
      };
    });
}

export class PiwaBadInputError extends Error {
  constructor() {
    super('You must provide a promise, async function, or function');
    this.name = 'PiwaBadInputError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

type PiwaError<Err = Error> = Err | PiwaBadInputError;
type PiwaArgs<Data> = Promise<Data> | (() => Promise<Data>) | (() => Data);

export type PiwaResponse<Data, Err extends Error> = Promise<
  { data: Data; error: null } | { data: null; error: Err }
>;

export default piwa;
