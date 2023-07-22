#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
    .option('length', {
        alias: 'l',
        type: 'number',
        description: 'length of code',
        default: 6
    })
    .parse()

var max = 10 ** argv.l
var code = Math.floor(Math.random() * max).toLocaleString('en-US', {
    minimumIntegerDigits: argv.length,
    useGrouping: false
})

console.log('Your code:', `\x1b[33m${code} \x1b[0m`);
