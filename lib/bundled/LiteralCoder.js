"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const NullCoder_1 = require("./NullCoder");
const BooleanCoder_1 = require("./BooleanCoder");
const NumberCoder_1 = require("./NumberCoder");
const StringCoder_1 = require("./StringCoder");
function LiteralCoder(value) {
    const coder = typeof value === 'boolean' ? BooleanCoder_1.BooleanCoder() :
        typeof value === 'number' ? NumberCoder_1.NumberCoder() :
            typeof value === 'string' ? StringCoder_1.StringCoder() : NullCoder_1.NullCoder();
    return {
        assert(data, options) {
            const result = coder.assert(data, options);
            if (result === value) {
                return result;
            }
            throw errors_1.AssertionError.new(`Expected ${data} to be ${value}`);
        },
        decode(data, options) {
            const result = coder.decode(data, options);
            if (result === value) {
                return result;
            }
            throw errors_1.DecodingError.new(`Could not decode data ${data} as ${value}`);
        },
        encode(data, options) {
            const result = coder.encode(data, options);
            if (result === value) {
                return result;
            }
            throw errors_1.EncodingError.new(`Could not encode data ${data} as ${value}`);
        }
    };
}
exports.LiteralCoder = LiteralCoder;
//# sourceMappingURL=LiteralCoder.js.map