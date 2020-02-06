export type TranscoderContext = {
  readonly tag: string
  readonly expected: string
  readonly key?: string | number
}

export type TranscoderErrorOrigin = TranscoderContext & {
  readonly value: any
}

export class TranscoderError extends Error {
  readonly value: any
  readonly trace: TranscoderContext[]

  get path() {
    return this.trace.reduceRight((acc, ctx) => (
      ctx.key !== undefined && acc.push('' + ctx.key), acc), ['#']).join('/')
  }

  constructor(ctx: TranscoderErrorOrigin, message?: string) {
    super(message)
    this.trace = [{ tag: ctx.tag, key: ctx.key, expected: ctx.expected }]
    this.value = ctx.value
  }

  static pushContext(err: TranscoderError, ctx: TranscoderContext) {
    return (err.trace.push(ctx), err)
  }
}
