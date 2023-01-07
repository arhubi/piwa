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
})();
