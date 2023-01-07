# Piwa

A simple and handy promise and try/catch wrapper.

## Features

Piwa handles the following:

- Promises
- Async functions
- Sync functions

And returns them with a flexible API.

## How to use

Piwa is a default exported function. Import it like:

```ts
// ESM
import piwa from 'piwa';

// CJS
const piwa = require('piwa');
```

### Promise

```ts
// Promise
const myPromise = Promise.resolve('ok!');
const { data, error } = await piwa(myPromise); // returns { data: 'ok!', error: null }

const myPromise = new Promise.reject('ko!');
const { data, error } = await piwa(myPromise); // returns { data: null, error: Error }
```

### Async function

```ts
const myAsyncFn = async (() => return 'ok!');
const { data, error } = await piwa(myPromise); // returns { data: 'ok!', error: null }

const myAsyncFn = async (() => throw 'ko!');
const { data, error } = await piwa(myPromise); // returns { data: null, error: Error }
```

### Sync function

```ts
const myFunction = () => return 'ok!';
const { data, error } = await piwa(myPromise); // returns { data: 'ok!', error: null }

const myFunction = () => throw 'ko!';
const { data, error } = await piwa(myPromise); // returns { data: null, error: Error }
```
