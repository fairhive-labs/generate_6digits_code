#!/usr/bin/env node

const max = 1000000;
console.log('Your code:', Math.floor(Math.random() * max).toLocaleString('en-US', {
    minimumIntegerDigits: 6,
    useGrouping: false
}));
