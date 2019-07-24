"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const defaults_1 = require("../defaults");
exports.BooleanCoder = () => ({
    pipe(data) {
        if (typeof data === 'boolean') {
            return data;
        }
        throw errors_1.AssertionError.new(`Expected ${data} to be boolean`);
    },
    decode(data, options) {
        if (typeof data === 'boolean') {
            return data;
        }
        if (options ? options.coerceOnDecode : defaults_1.defaultCodingOptions.coerceOnDecode) {
            switch (typeof data) {
                case 'number':
                    if (data === 0)
                        return false;
                    if (data === 1)
                        return true;
                    break;
                case 'string':
                    const string = data.toLowerCase();
                    if (string === '0' || string === 'false')
                        return false;
                    if (string === '1' || string === 'true')
                        return true;
                    break;
            }
        }
        throw errors_1.DecodingError.new(`Could not decode data ${data} as boolean`);
    },
    encode(data) {
        if (typeof data === 'boolean') {
            return data;
        }
        throw errors_1.EncodingError.new(`Could not encode data ${data} to boolean`);
    }
});
//# sourceMappingURL=BooleanCoder.js.map