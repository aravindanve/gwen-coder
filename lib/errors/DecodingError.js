"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TranscoderError_1 = require("../TranscoderError");
class DecodingError extends TranscoderError_1.TranscoderError {
    constructor(ctx, message) {
        super(ctx, message || `Unable to decode ${ctx.value} as ${ctx.expected}`);
    }
}
exports.DecodingError = DecodingError;
//# sourceMappingURL=DecodingError.js.map