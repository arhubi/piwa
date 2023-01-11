import test from 'ava';
import piwa, { PiwaBadInputError } from '../src/index';

test('returns data for a fullfilled promise', async t => {
  const { data, error } = await piwa(Promise.resolve('ok!'));

  t.is(data, 'ok!');
  t.is(error, null);
});

test('returns data for a passing async function', async t => {
  const { data, error } = await piwa(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    return 'ok!';
  });

  t.is(data, 'ok!');
  t.is(error, null);
});

test('returns data for a passing sync function', async t => {
  const { data, error } = await piwa(() => {
    return 'ok!';
  });

  t.is(data, 'ok!');
  t.is(error, null);
});

test('returns error for a failing promise', async t => {
  const { data, error } = await piwa(Promise.reject(new Error('ko!')));

  t.is(data, null);
  t.is(error instanceof Error, true);
  t.is(error.message, 'ko!');
});

test('returns a PiwaBadInputError if argument is not allowed', async t => {
  const invalidPiwaUsage = async () => {
    // @ts-expect-error
    await piwa({});
  };

  await t.throwsAsync(invalidPiwaUsage(), { instanceOf: PiwaBadInputError });
});
