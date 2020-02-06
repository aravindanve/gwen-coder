import { expect } from 'chai'
import { TranscoderError } from './TranscoderError'

describe('TranscoderError', () => {
  it('can be initialized', () => {
    const error = new TranscoderError({ tag: 'tag', value: null, expected: 'number' })
    expect(TranscoderError.pushContext(error, { tag: 'tag', expected: 'number' })).to.be.an.instanceOf(TranscoderError)
  })
  it('pushContext() appends context information', () => {
    const error = new TranscoderError({ tag: 'tag', value: null, expected: 'number' })
    expect(TranscoderError.pushContext(error, { key: '1', tag: 'SomeCoder', expected: 'Array<number>' }).trace).to.deep.eq([{ key: undefined, tag: 'tag', expected: 'number' }, { key: '1', tag: 'SomeCoder', expected: 'Array<number>' }])
    expect(TranscoderError.pushContext(error, { key: '2', tag: 'SomeCoder', expected: 'Array<Array<number>>' }).trace).to.deep.eq([{ key: undefined, tag: 'tag', expected: 'number' }, { key: '1', tag: 'SomeCoder', expected: 'Array<number>' }, { key: '2', tag: 'SomeCoder', expected: 'Array<Array<number>>' }])
  })
  it('get path() returns json-pointer', () => {
    const error = new TranscoderError({ tag: 'tag', value: null, expected: 'number' })
    TranscoderError.pushContext(error, { key: '1', tag: 'SomeCoder', expected: 'Array<number>' })
    TranscoderError.pushContext(error, { key: undefined, tag: 'SomeCoder', expected: 'Array<number>' })
    TranscoderError.pushContext(error, { key: '2', tag: 'SomeCoder', expected: 'Array<Array<number>>' })
    TranscoderError.pushContext(error, { key: '3', tag: 'SomeCoder', expected: 'Array<Array<Array<number>>>' })
    expect(error.path).to.eq('#/3/2/1')
  })
  it('get trace() returns context information', () => {
    const error = new TranscoderError({ tag: 'tag', value: null, expected: 'number' })
    TranscoderError.pushContext(error, { key: '1', tag: 'SomeCoder', expected: 'Array<number>' })
    TranscoderError.pushContext(error, { key: '2', tag: 'SomeCoder', expected: 'Array<Array<number>>' })
    TranscoderError.pushContext(error, { key: '3', tag: 'SomeCoder', expected: 'Array<Array<Array<number>>>' })
    expect(error.trace).to.deep.eq([{ key: undefined, tag: 'tag', expected: 'number' }, { key: '1', tag: 'SomeCoder', expected: 'Array<number>' }, { key: '2', tag: 'SomeCoder', expected: 'Array<Array<number>>' }, { key: '3', tag: 'SomeCoder', expected: 'Array<Array<Array<number>>>' }])
  })
})
