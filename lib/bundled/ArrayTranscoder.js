"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
function ArrayTranscoder(type) {
    return {
        codingOptions: {},
        async pipe(data) {
            if (!Array.isArray(data)) {
                throw errors_1.AssertionError.new(`Expected ${data} to be array`);
            }
            for (const [key, value] of data.entries()) {
                try {
                    await type.pipe(value);
                }
                catch (err) {
                    throw errors_1.AssertionError.pushContext(err, { key, ref: this });
                }
            }
            return data;
        },
        async decode(data) {
            if (!Array.isArray(data)) {
                throw errors_1.DecodingError.new(`Could not decode data ${data} as array`);
            }
            const result = [];
            for (const [key, value] of data.entries()) {
                try {
                    result.push(await type.decode(value));
                }
                catch (err) {
                    throw errors_1.DecodingError.pushContext(err, { key, ref: this });
                }
            }
            return result;
        },
        async encode(data) {
            if (!Array.isArray(data)) {
                throw errors_1.EncodingError.new(`Could not encode data ${data} to array`);
            }
            const result = [];
            for (const [key, value] of data.entries()) {
                try {
                    result.push(await type.encode(value));
                }
                catch (err) {
                    throw errors_1.EncodingError.pushContext(err, { key, ref: this });
                }
            }
            return result;
        }
    };
}
exports.ArrayTranscoder = ArrayTranscoder;
//# sourceMappingURL=ArrayTranscoder.js.map