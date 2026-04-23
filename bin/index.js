#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const {
    DEFAULT_DIGITS,
    MAX_DIGITS,
    MIN_DIGITS,
    generateCode
} = require('../lib/generate-code')

const argv = yargs(hideBin(process.argv))
    .scriptName('gen6dcode')
    .usage('$0 [options]')
    .option('digits', {
        alias: 'd',
        type: 'number',
        description: `number of digits (${MIN_DIGITS}-${MAX_DIGITS})`,
        default: DEFAULT_DIGITS
    })
    .strictOptions()
    .check((parsedArgv) => {
        const digits = parsedArgv.digits

        if (!Number.isInteger(digits) || digits < MIN_DIGITS || digits > MAX_DIGITS) {
            throw new Error(`--digits must be an integer between ${MIN_DIGITS} and ${MAX_DIGITS}`)
        }

        return true
    })
    .fail((message, error) => {
        const reason = error ? error.message : message
        console.error(reason)
        process.exit(1)
    })
    .parse()

const code = generateCode(argv.digits)

console.log(`${argv.digits} digits`)
console.log(`=> [ \x1b[33m${code}\x1b[0m ]`)
