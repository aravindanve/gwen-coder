"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function OptionalTranscoder(type) {
    return {
        codingOptions: {},
        pipe(data) {
            if (data === undefined) {
                return;
            }
            return type.pipe(data);
        },
        decode(data) {
            if (data === undefined) {
                return;
            }
            return type.decode(data);
        },
        encode(data) {
            if (data === undefined) {
                return;
            }
            return type.encode(data);
        }
    };
}
exports.OptionalTranscoder = OptionalTranscoder;
//# sourceMappingURL=OptionalTranscoder.js.map