export type CodingErrorContext = {
  key: string | number
  ref: any
}

export class CodingError extends Error {
  readonly trace: CodingErrorContext[] = []

  protected constructor(ctx?: CodingErrorContext, message?: string) {
    super(message)
    ctx && this.trace.push(ctx)
  }

  // FIXME: escape characters / and ~ in json pointer
  get path() {
    return '#/' + this.trace.map(ctx => ctx.key).reverse().join('/')
  }

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
