"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const NumberCoder_1 = require("./NumberCoder");
const tag = 'IntegerCoder';
const typeDescription = 'number (integer)';
const numberCoder = NumberCoder_1.NumberCoder();
exports.IntegerCoder = () => ({
    tag,
    typeDescription,
    encodedTypeDescription: typeDescription,
    assert(value, options) {
        return numberCoder.assert(value, options).then(_value => Number.isInteger(_value)
            ? _value
            : Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription })));
    },
    decode(value, options) {
        return numberCoder.decode(value, options).then(_value => Number.isInteger(_value)
            ? _value
            : Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription })));
    },
    encode(value, options) {
        return numberCoder.encode(value, options).then(_value => Number.isInteger(_value)
            ? _value
            : Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription })));
    }
});
//# sourceMappingURL=IntegerCoder.js.map