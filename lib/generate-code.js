const { randomBytes, randomInt } = require('crypto')

const DEFAULT_DIGITS = 6
const MIN_DIGITS = 1
const MAX_DIGITS = 20
const RANDOM_INT_MAX_DIGITS = 14

function normalizeDigits(input) {
    const digits = Number(input)

    if (!Number.isInteger(digits) || digits < MIN_DIGITS || digits > MAX_DIGITS) {
        throw new RangeError(`digits must be an integer between ${MIN_DIGITS} and ${MAX_DIGITS}`)
    }

    return digits
}

function generateWithRandomInt(digits) {
    const limit = 10 ** digits
    return String(randomInt(0, limit)).padStart(digits, '0')
}

function generateWithBigInt(digits) {
    const limit = 10n ** BigInt(digits)
    const byteLength = Math.ceil(limit.toString(2).length / 8)
    const maxValue = 1n << BigInt(byteLength * 8)
    const cutoff = maxValue - (maxValue % limit)

    while (true) {
        const value = BigInt(`0x${randomBytes(byteLength).toString('hex')}`)

        if (value < cutoff) {
            return (value % limit).toString().padStart(digits, '0')
        }
    }
}

function generateCode(input = DEFAULT_DIGITS) {
    const digits = normalizeDigits(input)

    if (digits <= RANDOM_INT_MAX_DIGITS) {
        return generateWithRandomInt(digits)
    }

    return generateWithBigInt(digits)
}

module.exports = {
    DEFAULT_DIGITS,
    MAX_DIGITS,
    MIN_DIGITS,
    generateCode,
    normalizeDigits
}
