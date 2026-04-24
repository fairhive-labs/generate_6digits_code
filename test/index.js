const assert = require('assert')
const { spawnSync } = require('child_process')
const path = require('path')
const packageJson = require('../package.json')
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

function runCli(args) {
    const result = spawnSync(process.execPath, [path.join(__dirname, '..', 'bin', 'index.js'), ...args], {
        encoding: 'utf8',
        env: {
            ...process.env,
            NO_COLOR: '1'
        }
    })

    return result
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

const cliResult = runCli(['-d', '6'])
assert.strictEqual(cliResult.status, 0, cliResult.stderr)
assert.strictEqual(cliResult.stderr, '')
assert.ok(cliResult.stdout.startsWith(`gen6dcode v${packageJson.version}\n`))
assert.match(cliResult.stdout, /\| digits : 6 +\|/)
assert.match(cliResult.stdout, /\| code   : [0-9]{6} +\|/)

const cliVersion = runCli(['--version'])
assert.strictEqual(cliVersion.status, 0, cliVersion.stderr)
assert.strictEqual(cliVersion.stdout.trim(), packageJson.version)

const cliJson = runCli(['--json', '-d', '8'])
assert.strictEqual(cliJson.status, 0, cliJson.stderr)
assert.strictEqual(cliJson.stderr, '')
const jsonOutput = JSON.parse(cliJson.stdout)
assert.deepStrictEqual(jsonOutput, {
    name: packageJson.name,
    version: packageJson.version,
    digits: 8,
    code: jsonOutput.code
})
assert.match(jsonOutput.code, /^[0-9]{8}$/)

const cliInvalid = runCli(['-d', '0'])
assert.strictEqual(cliInvalid.status, 1)
assert.match(cliInvalid.stderr, /--digits must be an integer between 1 and 20/)

console.log('All tests passed.')
