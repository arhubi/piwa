#!/usr/bin/env zx
import semverParse from 'semver/functions/parse.js';

// Prevent auth issue in the `npm publish`
$.env.npm_config_registry = undefined;

const { name, version } = await fs.readJson('./package.json');
import { bgCyan, bgYellow, bgGreen, bgRed, cyan, bold } from 'kolorist';

const prefixedVersion = `v${version}`;
console.log(
  bgCyan(' INFO '),
  `Release ${cyan(bold(name))} version ${bold(prefixedVersion)}`
);

const filesInDiff = (await $`git status -s`).stdout.split('\n').filter(Boolean);

if (filesInDiff.length > 1) {
  console.log(
    bgRed(` ERROR `),
    `You have ${bold(filesInDiff.length)} uncommited changes. Aborting.`
  );
  process.exit(1);
}

await $`yarn build`;

console.log(`${bgCyan(' INFO ')} Build succeeded!`);

const semVer = semverParse(version);
if (!semVer) {
  console.log(
    bgRed(` ERROR `),
    `Version ${bold(version)} is not a valid semantic version. Aborting.`
  );
  process.exit(1);
}

const { prerelease } = semverParse(version) ?? {};
const prereleaseTag = prerelease?.[0];
let confirm = await question(
  `${bgCyan(` >> `)} Do you confirm the release of ${bold(prefixedVersion)} ${
    prereleaseTag ? `as ${bold(prereleaseTag)}` : ''
  }? (y/n) `
);
if (!/y/i.test(confirm)) {
  console.log(bgYellow(' WARN '), `The release was cancelled`);
  process.exit(0);
}

const npmArgs = [].concat(prereleaseTag && `--tag ${prereleaseTag}`).join(' ');
await $`npm publish ${npmArgs}`;
await $`git tag ${version}`;
await $`git push origin ${version}`;

console.log(
  bgGreen(' OK '),
  `Release of ${bold(prefixedVersion)} succeed. \n✨  Good job partner.`
);
