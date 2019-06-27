export type CodingErrorContext = {
  key: string | number
  ref: any
}

export class CodingError extends Error {
  protected trace: CodingErrorContext[] = []

  protected constructor(ctx?: CodingErrorContext, message?: string) {
    super(message)
    ctx && this.trace.push(ctx)
  }

  getPath() { return '' } // FIXME
  getTrace() { return {} } // FIXME

  static new(message?: string, ctx?: CodingErrorContext) {
    return new this(ctx, message)
  }

  static pushContext(error: any, ctx: CodingErrorContext) {
    if (!(error instanceof CodingError)) {
      error = this.new(error.message, ctx)

    } else {
      error.trace.push(ctx)
    }

    return error as CodingError
  }
}
