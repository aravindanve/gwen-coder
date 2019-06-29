import { expect } from 'chai'
import { TranscoderError } from './TranscoderError'

describe('TranscoderError', () => {
  it('can be initialized', () => {
    TranscoderError.new()
    TranscoderError.pushContext(null, { key: 'key', ref: null as any })
    TranscoderError.pushContext('error', { key: 'key', ref: null as any })
  })
  it('pushContext() appends context information', () => {
    const error = TranscoderError.new()
    expect(TranscoderError.pushContext(error, { key: '1', ref: null as any }).trace).to.deep.eq([{ key: '1', ref: null as any }])
    expect(TranscoderError.pushContext(error, { key: '2', ref: null as any }).trace).to.deep.eq([{ key: '1', ref: null as any }, { key: '2', ref: null as any }])
  })
  it('get path() returns json-pointer', () => {
    const error = TranscoderError.new()
    TranscoderError.pushContext(error, { key: '1', ref: null as any })
    TranscoderError.pushContext(error, { key: '2', ref: null as any })
    TranscoderError.pushContext(error, { key: '3', ref: null as any })
    expect(error.path).to.eq('#/3/2/1')
  })
  it('get trace() returns context information', () => {
    const error = TranscoderError.new()
    TranscoderError.pushContext(error, { key: '1', ref: null as any })
    TranscoderError.pushContext(error, { key: '2', ref: null as any })
    TranscoderError.pushContext(error, { key: '3', ref: null as any })
    expect(error.trace).to.deep.eq([{ key: '1', ref: null as any }, { key: '2', ref: null as any }, { key: '3', ref: null as any }])
  })
})
