# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Node.js CLI package. The main entrypoint is [bin/index.js](/Users/jsie/github/fairhive-labs/generate_6digits_code/bin/index.js:1), which parses `--digits` with `yargs` and prints the generated code. Package metadata and scripts live in [package.json](/Users/jsie/github/fairhive-labs/generate_6digits_code/package.json:1). Usage documentation is in [README.md](/Users/jsie/github/fairhive-labs/generate_6digits_code/README.md:1), and release automation is in [.github/workflows/npm-publish.yml](/Users/jsie/github/fairhive-labs/generate_6digits_code/.github/workflows/npm-publish.yml:1).

## Build, Test, and Development Commands
Install dependencies with `npm install`.
Run the CLI locally with `npm start` or `node ./bin/index.js`.
Pass arguments after `--`, for example `npm start -- --digits 8`.
Check the packaged artifact with `npm pack` before publishing.

There is no working automated test script today: `npm test` intentionally exits with an error placeholder. If you add tests, update `package.json` so contributors can run them with a single command.

## Coding Style & Naming Conventions
Use CommonJS modules (`require`, `module.exports`) to match the current codebase. Follow the existing JavaScript style in `bin/index.js`: 4-space indentation, single quotes, and simple imperative control flow. Keep CLI flags long-form and descriptive, with a short alias where useful, for example `--digits` and `-d`.

Prefer clear variable names such as `max`, `code`, and `digits`. Keep dependencies minimal; this package currently relies only on `yargs`.

## Testing Guidelines
No framework is configured yet. For new behavior, add lightweight automated coverage around argument parsing and edge cases such as `digits <= 0` and `digits > 20`. Place tests in a new `test/` or `tests/` directory and use filenames ending in `.test.js`.

Before opening a PR, manually verify:
`node ./bin/index.js`
`node ./bin/index.js -d 6`
`node ./bin/index.js -d 20`
`node ./bin/index.js -d 0`

## Commit & Pull Request Guidelines
Recent commits use short imperative subjects such as `update version + readme` and `control out of range values`. Keep commits focused and use a concise one-line summary describing the user-visible change.

PRs should include a brief description, the commands used for verification, and any README updates when CLI behavior changes. If output formatting changes, include a terminal example in the PR description.
