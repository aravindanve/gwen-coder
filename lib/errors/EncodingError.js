"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TranscoderError_1 = require("../TranscoderError");
class EncodingError extends TranscoderError_1.TranscoderError {
    constructor(ctx, message) {
        super(ctx, message || `Unable to encode ${ctx.value} as ${ctx.expected}`);
    }
}
exports.EncodingError = EncodingError;
//# sourceMappingURL=EncodingError.js.map