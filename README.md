# Piwa

**Piwa** wraps your promises, async, and sync functions in a sleek, error-handling cocoon, letting you focus on what truly matters: your code's logic, not its plumbing.

## Why Piwa?

- **Simplify Error Handling**: Say goodbye to cluttered try/catch blocks.
- **Unified API**: Whether it's a promise, an async function, or a simple synchronous function, Piwa handles it all.
- **Cleaner Code**: Your codebase stays clean and readable, making maintenance and debugging a breeze.

## Getting Started

### Installation

Install Piwa with npm:

```sh
npm install piwa
```

Or with yarn:

```
yarn add piwa
```

### Importing Piwa

```ts
// Using ES Modules
import piwa from 'piwa';

// Using CommonJS
const piwa = require('piwa');
```

## Usage

### Handling Promises

```ts
const myPromise = new Promise((resolve, reject) => {
  // Your logic here...
  resolve('Success!');
});

// Using Piwa
const { data, error } = await piwa(myPromise);
console.log(data); // 'Success!', error: null
```

### With Async Functions

```ts
async function myAsyncFunction() {
  // Your logic here...
  return 'Async Success!';
}

// Wrap with Piwa
const { data, error } = await piwa(myAsyncFunction);
console.log(data); // 'Async Success!', error: null
```

### Wrapping Synchronous Functions

Piwa elegantly wraps synchronous functions, handling both return values and exceptions.

```ts
function mySyncFunction() {
  // Your logic here...
  return 'Sync Success!';
}

// Piwa wraps it in a promise
const { data, error } = await piwa(mySyncFunction);
console.log(data); // 'Sync Success!', error: null
```
