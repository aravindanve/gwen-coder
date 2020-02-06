"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const errors_1 = require("../errors");
const tag = 'StringCoder';
const typeDescription = 'string';
exports.StringCoder = () => ({
    tag,
    typeDescription,
    encodedTypeDescription: typeDescription,
    assert(value) {
        return typeof value === 'string'
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }));
    },
    decode(value, options) {
        if (typeof value === 'string') {
            return Promise.resolve(value);
        }
        if (options ? options.coerceOnDecode : shared_1.defaultCodingOptions.coerceOnDecode) {
            switch (typeof value) {
                case 'number':
                case 'boolean':
                    return Promise.resolve('' + value);
            }
        }
        return Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }));
    },
    encode(value) {
        return typeof value === 'string'
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription }));
    }
});
//# sourceMappingURL=StringCoder.js.map