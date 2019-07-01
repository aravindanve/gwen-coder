"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
function NullCoder(options) {
    const codingOptions = Object.assign({ coerceNullFromStringOnDecode: false }, options);
    return {
        codingOptions,
        pipe(data) {
            if (data === null) {
                return data;
            }
            throw errors_1.AssertionError.new(`Expected ${data} to be null`);
        },
        decode(data) {
            if (data === null) {
                return data;
            }
            if (codingOptions.coerceNullFromStringOnDecode) {
                if (typeof data === 'string' && data.toLowerCase() === 'null') {
                    return null;
                }
            }
            throw errors_1.DecodingError.new(`Could not decode data ${data} as null`);
        },
        encode(data) {
            if (data === null) {
                return data;
            }
            throw errors_1.EncodingError.new(`Could not encode data ${data} to null`);
        }
    };
}
exports.NullCoder = NullCoder;
//# sourceMappingURL=NullCoder.js.map