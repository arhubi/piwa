export type PiwaResponse<Data, Err> = Promise<
  { data: Data; error: null } | { data: null; error: Err }
>;

type PiwaArgs<Data> = Promise<Data> | (() => Promise<Data>) | (() => Data);

/**
 * Promise wrapper that returns data or error in an object format
 * @param promiseOrFunction - Any promise, async function, or function
 */
async function piwa<Data, Err = Error>(
  promiseOrFunction: PiwaArgs<Data>
): PiwaResponse<Data, Err> {
  const _promise: Promise<Data> =
    typeof promiseOrFunction === 'object'
      ? promiseOrFunction
      : (async () => promiseOrFunction())();

  return _promise
    .then((data: Data) => ({ data, error: null }))
    .catch(error => {
      return {
        error,
        data: null,
      };
    });
}

export default piwa;
