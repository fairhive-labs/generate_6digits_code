# generate_6digits_code

Small Node.js CLI for generating zero-padded numeric codes with cryptographically secure randomness.

## Runtime

This project targets Node.js 24 LTS. Use `.nvmrc` with `nvm use`, or install any `24.x` release.

## Install

Global install:

```bash
npm install -g @poln/gen6dcode
```

Run without installing:

```bash
npx @poln/gen6dcode
```

## Usage

Generate the default 6-digit code:

```bash
gen6dcode
```

Generate a custom length:

```bash
gen6dcode --digits 8
gen6dcode -d 20
```

Show help:

```bash
gen6dcode --help
```

Example output:

```text
gen6dcode v3.0.4
+---------------------------+
| digits : 6                |
| code   : 482913           |
+---------------------------+
```

## Rules

- Supported digit range: `1` to `20`
- Output is always zero-padded to the requested length
- Invalid input exits with code `1`

Example invalid input:

```bash
gen6dcode -d 0
# --digits must be an integer between 1 and 20
```

## Why this version is safer

Older implementations based on `Math.random()` and floating-point math can produce biased output and become inaccurate at higher digit counts. This package now uses Node's `crypto` module, including a secure fast path for smaller codes and exact `BigInt`-based generation for larger ones.

## Local development

```bash
npm install
nvm use
npm start
npm start -- --digits 12
npm test
```
