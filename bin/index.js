#!/usr/bin/env node

var max = 1000000;
var code = Math.floor(Math.random() * max).toLocaleString('en-US', {
    minimumIntegerDigits: 6,
    useGrouping: false
})
console.log('Your code:', `\x1b[33m${code} \x1b[0m`);
