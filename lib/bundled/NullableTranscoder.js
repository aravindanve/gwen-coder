"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NullCoder_1 = require("./NullCoder");
function NullableTranscoder(type) {
    const coder = NullCoder_1.NullCoder();
    return {
        assert(data, options) {
            try {
                return coder.assert(data, options);
            }
            catch (_a) {
                return type.assert(data, options);
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
exports.NullableTranscoder = NullableTranscoder;
//# sourceMappingURL=NullableTranscoder.js.map