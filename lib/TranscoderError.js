"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TranscoderError extends Error {
    constructor(ctx, message) {
        super(message);
        this.trace = [];
        ctx && this.trace.push(ctx);
    }
    get path() {
        return '#/' + this.trace.map(ctx => ctx.key).reverse().join('/');
    }
    static new(message, ctx) {
        return new this(ctx, message);
    }
    static pushContext(error, ctx) {
        if (!(error instanceof TranscoderError)) {
            error = this.new(error && error.toString(), ctx);
        }
        else {
            error.trace.push(ctx);
        }
        return error;
    }
}
exports.TranscoderError = TranscoderError;
//# sourceMappingURL=TranscoderError.js.map