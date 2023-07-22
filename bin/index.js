#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
    .option('digits', {
        alias: 'd',
        type: 'number',
        description: 'number of digits',
        default: 6
    })
    .parse()

var max = 10 ** argv.d
var code = Math.floor(Math.random() * max).toLocaleString('en-US', {
    minimumIntegerDigits: argv.d,
    useGrouping: false
})

console.log('Your code:', `\x1b[33m${code} \x1b[0m`);
