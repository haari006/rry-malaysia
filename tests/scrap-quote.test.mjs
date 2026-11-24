import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import ts from 'typescript'

const source = readFileSync(new URL('../src/lib/scrap-quote.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText
const { calculateScrapQuote } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`)

test('published rate applies without the old volume bonus or pickup deduction', () => {
  const rate = { currentPrice: 46, unit: 'kg' }
  for (const weight of [100, 499, 500, 1000, 1001, 1500]) {
    assert.equal(calculateScrapQuote(weight, rate), weight * 46)
  }
  assert.equal(calculateScrapQuote(100, rate), 4600)
  assert.equal(calculateScrapQuote(1500, rate), 69000)
})

test('fractional weights, tonnes, and zero rates are supported', () => {
  assert.equal(calculateScrapQuote(2.5, { currentPrice: 4.2, unit: 'kg' }), 10.5)
  assert.equal(calculateScrapQuote(1.5, { currentPrice: 2000, unit: 'ton' }), 3000)
  assert.equal(calculateScrapQuote(100, { currentPrice: 0, unit: 'kg' }), 0)
})

test('invalid inputs and overflow never produce an estimate', () => {
  const rate = { currentPrice: 46, unit: 'kg' }
  for (const weight of [0, -1, NaN, Infinity]) assert.equal(calculateScrapQuote(weight, rate), null)
  assert.equal(calculateScrapQuote(1), null)
  for (const price of [-1, NaN, Infinity]) assert.equal(calculateScrapQuote(1, { currentPrice: price, unit: 'kg' }), null)
  assert.equal(calculateScrapQuote(1, { currentPrice: 46, unit: 'unknown' }), null)
  assert.equal(calculateScrapQuote(Number.MAX_VALUE, rate), null)
})
