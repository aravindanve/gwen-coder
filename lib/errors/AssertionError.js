"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TranscoderError_1 = require("../TranscoderError");
class AssertionError extends TranscoderError_1.TranscoderError {
    constructor(ctx, message) {
        super(ctx, message || `Expected ${ctx.expected}, instead found: ${ctx.value}`);
    }
}
exports.AssertionError = AssertionError;
//# sourceMappingURL=AssertionError.js.map