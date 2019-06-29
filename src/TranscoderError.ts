import { Transcoder } from './shared'

export type TranscoderErrorContext = {
  key: string | number
  ref: Transcoder<any, any>
}

export class TranscoderError extends Error {
  readonly trace: TranscoderErrorContext[] = []

  protected constructor(ctx?: TranscoderErrorContext, message?: string) {
    super(message)
    ctx && this.trace.push(ctx)
  }

  // FIXME: escape characters / and ~ in json pointer
  get path() {
    return '#/' + this.trace.map(ctx => ctx.key).reverse().join('/')
  }

  static new(message?: string, ctx?: TranscoderErrorContext) {
    return new this(ctx, message)
  }

  static pushContext(error: any, ctx: TranscoderErrorContext) {
    if (!(error instanceof TranscoderError)) {
      error = this.new(error && error.toString(), ctx)

    } else {
      error.trace.push(ctx)
    }

    return error as TranscoderError
  }
}
