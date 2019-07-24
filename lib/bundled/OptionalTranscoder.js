"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UndefinedCoder_1 = require("./UndefinedCoder");
function OptionalTranscoder(type) {
    const coder = UndefinedCoder_1.UndefinedCoder();
    return {
        pipe(data, options) {
            try {
                return coder.pipe(data, options);
            }
            catch (_a) {
                return type.pipe(data, options);
            }
        },
        decode(data, options) {
            try {
                return coder.decode(data, options);
            }
            catch (_a) {
                return type.decode(data, options);
            }
        },
        encode(data, options) {
            try {
                return coder.encode(data, options);
            }
            catch (_a) {
                return type.encode(data, options);
            }
        }
    };
}
exports.OptionalTranscoder = OptionalTranscoder;
//# sourceMappingURL=OptionalTranscoder.js.map