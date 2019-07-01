"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NullCoder_1 = require("./NullCoder");
function NullableTranscoder(type, options) {
    const codingOptions = options || {};
    const nullCoder = NullCoder_1.NullCoder(codingOptions);
    return {
        codingOptions,
        pipe(data) {
            try {
                return nullCoder.pipe(data);
            }
            catch (_a) {
                return type.pipe(data);
            }
        },
        decode(data) {
            try {
                return nullCoder.decode(data);
            }
            catch (_a) {
                return type.decode(data);
            }
        },
        encode(data) {
            try {
                return nullCoder.encode(data);
            }
            catch (_a) {
                return type.encode(data);
            }
        }
    };
}
exports.NullableTranscoder = NullableTranscoder;
//# sourceMappingURL=NullableTranscoder.js.map