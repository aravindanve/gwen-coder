"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const errors_1 = require("../errors");
const tag = 'NumberCoder';
const typeDescription = 'number';
exports.NumberCoder = () => ({
    tag,
    typeDescription,
    encodedTypeDescription: typeDescription,
    assert(value) {
        return typeof value === 'number' && !isNaN(value)
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }));
    },
    decode(value, options) {
        if (typeof value === 'number' && !isNaN(value)) {
            return Promise.resolve(value);
        }
        if (options ? options.coerceOnDecode : shared_1.defaultCodingOptions.coerceOnDecode) {
            switch (typeof value) {
                case 'boolean':
                    return Promise.resolve(value ? 1 : 0);
                case 'string':
                    if (!isNaN(+value))
                        return Promise.resolve(+value);
                    break;
            }
        }
        return Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }));
    },
    encode(value) {
        return typeof value === 'number' && !isNaN(value)
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription }));
    }
});
//# sourceMappingURL=NumberCoder.js.map