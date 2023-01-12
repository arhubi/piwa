# Piwa

A simple and handy promise and try/catch wrapper.

## Features

Piwa handles the following:

- Promises
- Async functions
- Sync functions

And returns them with a flexible API.

## How to use

Import piwa in your project:

```ts
// ESM
import piwa from 'piwa';

// CJS
const piwa = require('piwa');
```

### Promise

```ts
// Promise
const myPromise = new Promise((resolve, reject) => {
  // ... processing
  resolve('ok!');
});
const { data, error } = await piwa(myPromise); // returns { data: 'ok!', error: null }

const myPromise = new Promise((resolve, reject) => {
  // ... processing
  reject('ko!');
});
const { data, error } = await piwa(myPromise); // returns { data: null, error: 'ko!' }
```

### Async function

```ts
const myAsyncFn = async () => {
  // ... processing
  return 'ok!';
};
const { data, error } = await piwa(myAsyncFn); // returns { data: 'ok!', error: null }

const myAsyncFn = async () => {
  // ... processing
  throw 'ko!';
};
const { data, error } = await piwa(myAsyncFn); // returns { data: null, error: Error }
```

### Sync function

Piwa automatically wraps sync functions within a promise.

```ts
const myFunction = () => {
  return 'ok!';
};
const { data, error } = await piwa(myFunction); // returns { data: 'ok!', error: null }

const myFunction = () => {
  throw 'ko!';
};
const { data, error } = await piwa(myFunction); // returns { data: null, error: Error }
```
