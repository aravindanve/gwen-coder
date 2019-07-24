"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const defaults_1 = require("../defaults");
exports.StringCoder = () => ({
    pipe(data) {
        if (typeof data === 'string') {
            return data;
        }
        throw errors_1.AssertionError.new(`Expected ${data} to be string`);
    },
    decode(data, options) {
        if (typeof data === 'string') {
            return data;
        }
        if (options ? options.coerceOnDecode : defaults_1.defaultCodingOptions.coerceOnDecode) {
            switch (typeof data) {
                case 'number':
                case 'boolean':
                    return '' + data;
            }
        }
        throw errors_1.DecodingError.new(`Could not decode data ${data} as string`);
    },
    encode(data) {
        if (typeof data === 'string') {
            return data;
        }
        throw errors_1.EncodingError.new(`Could not encode data ${data} to string`);
    }
});
//# sourceMappingURL=StringCoder.js.map