const assert = require('assert')
const {
    DEFAULT_DIGITS,
    MAX_DIGITS,
    MIN_DIGITS,
    generateCode,
    normalizeDigits
} = require('../lib/generate-code')

function expectThrows(fn, message) {
    let didThrow = false

    try {
        fn()
    } catch (error) {
        didThrow = true
        assert.match(error.message, message)
    }

    assert.strictEqual(didThrow, true, 'expected function to throw')
}

assert.strictEqual(DEFAULT_DIGITS, 6)
assert.strictEqual(MIN_DIGITS, 1)
assert.strictEqual(MAX_DIGITS, 20)

assert.strictEqual(normalizeDigits(6), 6)
assert.strictEqual(normalizeDigits('8'), 8)

expectThrows(() => normalizeDigits(0), /between 1 and 20/)
expectThrows(() => normalizeDigits(21), /between 1 and 20/)
expectThrows(() => normalizeDigits(1.5), /between 1 and 20/)
expectThrows(() => normalizeDigits('abc'), /between 1 and 20/)

for (const digits of [1, 6, 14, 15, 20]) {
    const code = generateCode(digits)

    assert.match(code, new RegExp(`^[0-9]{${digits}}$`))
    assert.strictEqual(code.length, digits)
}

const twentyDigitSamples = new Set()
for (let index = 0; index < 25; index += 1) {
    twentyDigitSamples.add(generateCode(20))
}

assert.ok(twentyDigitSamples.size > 1, '20-digit output should vary across samples')

console.log('All tests passed.')
