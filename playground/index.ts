import piwa from '../src';

(async () => {
  // Piwa can take a promise
  const { data: demo1Data } = await piwa(
    Promise.resolve('[demo 1] Piwa is awesome...')
  );
  console.log(demo1Data);

  // Piwa can take an async function (function that returns a promise)
  const { data: demo2Data } = await piwa(async () => {
    return '[demo 2] ...and so versatile';
  });
  console.log(demo2Data);

  // And even a classic function, to avoid try / catch blocks
  const { data: demo3Data } = await piwa(() => {
    return '[demo 3] This one is surprising, uh?';
  });
  console.log(demo3Data);

  // ----

  // What about the worst case scenarios?
  const { data: demo4Data, error: demo4Error } = await piwa(
    new Promise((_, reject) => reject('[demo 4] Oh oh. We how some troubles.'))
  );
  console.log(demo4Error);
  console.log('[demo 4] If there is an error, it should be null:', demo4Data);

  // It works on async functions too
  const { data: demo5Data, error: demo5Error } = await piwa(async () => {
    throw '[demo 5] Uh uh. Another troubles.';
  });
  console.log(demo5Error);
  console.log('[demo 5] Still null?', demo5Data);

  // And on sync (classic) functions
  const { data: demo6Data, error: demo6Error } = await piwa(() => {
    // Don't try this at home
    JSON.parse('[demo 6] oops');
  });
  console.log('[demo 6] Error from sync function:', demo6Error);
  console.log('[demo 6] Where is the data?', demo6Data);

  // Piwa works great with typings too
  // You can type data
  interface Data {
    key: string;
  }
  const { data: demo7Data } = await piwa<Data>(() => {
    return { key: 'value' };
  });
  console.log('[demo 7] Data is properly typed:', demo7Data?.key);

  // And you can type error
  class BigError extends Error {
    data: 'I’m the big error data';
  }
  const { error: demo8Error } = await piwa<null, BigError>(() => {
    throw new BigError('Boom!');
  });
  console.log('[demo 8] Error is properly typed too:', demo8Error?.data);

  // ----

  // If the input is incorrect, piwa throws with a PiwaBadInputError
  const { error: demo9Error } = await piwa(async () => {
    // We deliberately pass a wrong input
    // @ts-expect-error
    await piwa({});
  });
  console.log('[demo 9] Error is:', demo9Error);
})();
