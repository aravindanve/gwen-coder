"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const defaults_1 = require("../defaults");
exports.NullCoder = () => ({
    pipe(data) {
        if (data === null) {
            return data;
        }
        throw errors_1.AssertionError.new(`Expected ${data} to be null`);
    },
    decode(data, options) {
        if (data === null) {
            return data;
        }
        if (options ? options.coerceNullFromStringOnDecode : defaults_1.defaultCodingOptions.coerceNullFromStringOnDecode) {
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
});
//# sourceMappingURL=NullCoder.js.map