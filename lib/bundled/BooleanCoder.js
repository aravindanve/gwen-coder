"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const errors_1 = require("../errors");
const tag = 'BooleanCoder';
const typeDescription = 'boolean';
exports.BooleanCoder = () => ({
    tag,
    typeDescription,
    encodedTypeDescription: typeDescription,
    assert(value) {
        return typeof value === 'boolean'
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }));
    },
    decode(value, options) {
        if (typeof value === 'boolean') {
            return Promise.resolve(value);
        }
        if (options ? options.coerceOnDecode : shared_1.defaultCodingOptions.coerceOnDecode) {
            switch (typeof value) {
                case 'number':
                    if (value === 0)
                        return Promise.resolve(false);
                    if (value === 1)
                        return Promise.resolve(true);
                    break;
                case 'string':
                    const string = value.toLowerCase();
                    if (string === '0' || string === 'false')
                        return Promise.resolve(false);
                    if (string === '1' || string === 'true')
                        return Promise.resolve(true);
                    break;
            }
        }
        return Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }));
    },
    encode(value) {
        return typeof value === 'boolean'
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription }));
    }
});
//# sourceMappingURL=BooleanCoder.js.map