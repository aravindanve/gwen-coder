"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const NullCoder_1 = require("./NullCoder");
const BooleanCoder_1 = require("./BooleanCoder");
const NumberCoder_1 = require("./NumberCoder");
const StringCoder_1 = require("./StringCoder");
const tag = 'LiteralCoder';
const nullCoder = NullCoder_1.NullCoder();
const booleanCoder = BooleanCoder_1.BooleanCoder();
const numberCoder = NumberCoder_1.NumberCoder();
const stringCoder = StringCoder_1.StringCoder();
exports.LiteralCoder = (literal) => {
    const typeDescription = '' + literal;
    const coder = (typeof literal === 'boolean' ? booleanCoder :
        typeof literal === 'number' ? numberCoder :
            typeof literal === 'string' ? stringCoder : nullCoder);
    return {
        tag,
        typeDescription,
        encodedTypeDescription: typeDescription,
        assert(value, options) {
            return coder.assert(value, options).then(_value => _value === literal
                ? value
                : Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription })));
        },
        decode(value, options) {
            return coder.decode(value, options).then(_value => _value === literal
                ? _value
                : Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription })));
        },
        encode(value, options) {
            return coder.encode(value, options).then(_value => _value === literal
                ? _value
                : Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription })));
        }
    };
};
//# sourceMappingURL=LiteralCoder.js.map