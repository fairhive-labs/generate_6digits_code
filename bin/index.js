#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const packageJson = require('../package.json')
const {
    DEFAULT_DIGITS,
    MAX_DIGITS,
    MIN_DIGITS,
    generateCode
} = require('../lib/generate-code')

const ANSI = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m'
}

function supportsColor() {
    return process.stdout.isTTY && process.env.NO_COLOR === undefined
}

function paint(text, color) {
    if (!supportsColor()) {
        return text
    }

    return `${color}${text}${ANSI.reset}`
}

function createRow(label, value, width, color) {
    const plainContent = `${label} : ${value}`
    const padding = ' '.repeat(width - plainContent.length)
    const renderedValue = paint(value, color)

    return `| ${label} : ${renderedValue}${padding} |`
}

function formatOutput(digits, code) {
    const header = paint(`gen6dcode v${packageJson.version}`, `${ANSI.bold}${ANSI.cyan}`)
    const rows = [
        ['digits', String(digits), ANSI.dim],
        ['code  ', code, `${ANSI.bold}${ANSI.yellow}`]
    ]
    const width = Math.max(...rows.map(([label, value]) => `${label} : ${value}`.length))
    const border = `+${'-'.repeat(width + 2)}+`

    return [
        header,
        border,
        ...rows.map(([label, value, color]) => createRow(label, value, width, color)),
        border
    ].join('\n')
}

const argv = yargs(hideBin(process.argv))
    .scriptName('gen6dcode')
    .usage('$0 [options]')
    .version(packageJson.version)
    .alias('v', 'version')
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

console.log(formatOutput(argv.digits, code))
