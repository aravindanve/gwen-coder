import { TranscoderError, TranscoderErrorOrigin } from '../TranscoderError'

export class AssertionError extends TranscoderError {
  constructor(ctx: TranscoderErrorOrigin, message?: string) {
    super(ctx, message || `Expected ${ctx.expected}, instead found: ${ctx.value}`)
  }
}
