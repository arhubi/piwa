/**
 * Promise wrapper that returns data or error in an object format
 * @param promiseOrFunction - Any promise, async function, or function
 */
async function _piwa<Data, Err extends Error = Error>(
  promiseOrFunction: PiwaArgs<Data>
): PiwaResponse<Data, Err> {
  const isValidInput =
    typeof promiseOrFunction === 'function' ||
    promiseOrFunction instanceof Promise;

  if (!isValidInput) {
    throw new PiwaBadInputError();
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
    super('Piwa only accepts promise, async function, or function');
    this.name = 'PiwaBadInputError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

type PiwaArgs<Data> = Promise<Data> | (() => Promise<Data>) | (() => Data);

export type PiwaResponse<Data, Err extends Error> = Promise<
  { data: Data; error: null } | { data: null; error: Err }
>;

export default _piwa;
export const pw = _piwa;
export const piwa = _piwa;
