import { TranscoderError, TranscoderErrorOrigin } from '../TranscoderError'

export class DecodingError extends TranscoderError {
  constructor(ctx: TranscoderErrorOrigin, message?: string) {
    super(ctx, message || `Unable to decode ${ctx.value} as ${ctx.expected}`)
  }
}
