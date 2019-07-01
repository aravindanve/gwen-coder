"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
function UnionTranscoder(...types) {
    return {
        codingOptions: {},
        pipe(data) {
            let promise = Promise.reject(errors_1.AssertionError.new(`Unexpected data ${data}`));
            for (const type of types) {
                promise = promise.catch(() => type.pipe(data));
            }
            return promise;
        },
        decode(data) {
            let promise = Promise.reject(errors_1.DecodingError.new(`Could not decode data ${data}`));
            for (const type of types) {
                promise = promise.catch(() => type.decode(data));
            }
            return promise;
        },
        encode(data) {
            let promise = Promise.reject(errors_1.EncodingError.new(`Could not encode data ${data}`));
            for (const type of types) {
                promise = promise.catch(() => type.encode(data));
            }
            return promise;
        }
    };
}
exports.UnionTranscoder = UnionTranscoder;
//# sourceMappingURL=UnionTranscoder.js.map