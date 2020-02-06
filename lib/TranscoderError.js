"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TranscoderError extends Error {
    get path() {
        return this.trace.reduceRight((acc, ctx) => (ctx.key !== undefined && acc.push('' + ctx.key), acc), ['#']).join('/');
    }
    constructor(ctx, message) {
        super(message);
        this.trace = [{ tag: ctx.tag, key: ctx.key, expected: ctx.expected }];
        this.value = ctx.value;
    }
    static pushContext(err, ctx) {
        return (err.trace.push(ctx), err);
    }
}
exports.TranscoderError = TranscoderError;
//# sourceMappingURL=TranscoderError.js.map