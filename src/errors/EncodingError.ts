import { TranscoderError, TranscoderErrorOrigin } from '../TranscoderError'

export class EncodingError extends TranscoderError {
  constructor(ctx: TranscoderErrorOrigin, message?: string) {
    super(ctx, message || `Unable to encode ${ctx.value} as ${ctx.expected}`)
  }
}
