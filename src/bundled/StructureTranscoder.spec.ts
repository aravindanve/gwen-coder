import { expect } from 'chai'
import { StructureTranscoder } from './StructureTranscoder'
import { AssertionError, DecodingError, EncodingError } from '../errors'
import { StringCoder } from './StringCoder'
import { NumberCoder } from './NumberCoder'
import { OptionalTranscoder } from './OptionalTranscoder'
import { ConfiguredTranscoder } from './ConfiguredTranscoder'

describe('StructureTranscoder', () => {
  it('can be initialized', () => {
    StructureTranscoder({})
    StructureTranscoder({ name: StringCoder(), age: NumberCoder() })
    StructureTranscoder({ name: StringCoder(), age: OptionalTranscoder(NumberCoder()) })
  })
  it('asserts type on assert()', async () => {
    await expect(StructureTranscoder({ name: StringCoder(), age: NumberCoder() }).assert({ name: 'a', age: 1 })).to.eventually.deep.eq({ name: 'a', age: 1 })
    await expect(StructureTranscoder({ name: StringCoder() }).assert({ name: 'a' } as any)).to.eventually.deep.eq({ name: 'a' })
    await expect(ConfiguredTranscoder(StructureTranscoder({ name: StringCoder() }), { ignoreExtraOnAssert: true }).assert({ name: 'a', age: 1 } as any)).to.eventually.deep.eq({ name: 'a', age: 1 })

    const coder = StructureTranscoder({ name: StringCoder(), age: OptionalTranscoder(NumberCoder()) })

    await expect(coder.assert({ name: 'b' })).to.eventually.deep.eq({ name: 'b' })
    await expect(coder.assert({ name: 'b', age: 42 })).to.eventually.deep.eq({ name: 'b', age: 42 })
    await expect(coder.assert({} as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert({ name: 'b', unknown: 42 } as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(undefined as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(null as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(true as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert(42 as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert('[]' as any)).to.be.rejectedWith(AssertionError)
    await expect(coder.assert([] as any)).to.be.rejectedWith(AssertionError)
  })
  it('decodes type on decode()', async () => {
    await expect(StructureTranscoder({ name: StringCoder(), age: NumberCoder() }).decode({ name: 'a', age: 1 })).to.eventually.deep.eq({ name: 'a', age: 1 })
    await expect(StructureTranscoder({ name: StringCoder() }).decode({ name: 'a', age: 1 } as any)).to.eventually.deep.eq({ name: 'a' })

    const coder = StructureTranscoder({ name: StringCoder(), age: OptionalTranscoder(NumberCoder()) })

    await expect(coder.decode({ name: 'b' })).to.eventually.deep.eq({ name: 'b', age: undefined })
    await expect(coder.decode({ name: 'b', age: 42 })).to.eventually.deep.eq({ name: 'b', age: 42 })
    await expect(coder.decode({} as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(undefined as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(null as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(true as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode(42 as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode('[]' as any)).to.be.rejectedWith(DecodingError)
    await expect(coder.decode([] as any)).to.be.rejectedWith(DecodingError)
  })
  it('encodes type on encode()', async () => {
    await expect(StructureTranscoder({ name: StringCoder(), age: NumberCoder() }).encode({ name: 'a', age: 1 })).to.eventually.deep.eq({ name: 'a', age: 1 })
    await expect(StructureTranscoder({ name: StringCoder() }).encode({ name: 'a', age: 1 } as any)).to.eventually.deep.eq({ name: 'a' })

    const coder = StructureTranscoder({ name: StringCoder(), age: OptionalTranscoder(NumberCoder()) })

    await expect(coder.encode({ name: 'b' })).to.eventually.deep.eq({ name: 'b', age: undefined })
    await expect(coder.encode({ name: 'b', age: 42 })).to.eventually.deep.eq({ name: 'b', age: 42 })
    await expect(coder.encode({} as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(undefined as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(null as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(true as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode(42 as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode('[]' as any)).to.be.rejectedWith(EncodingError)
    await expect(coder.encode([] as any)).to.be.rejectedWith(EncodingError)
  })
})
