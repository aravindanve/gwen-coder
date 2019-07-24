"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const NumberCoder_1 = require("./NumberCoder");
function IntegerCoder() {
    const coder = NumberCoder_1.NumberCoder();
    return {
        pipe(data, options) {
            if (Number.isInteger(coder.pipe(data, options))) {
                return data;
            }
            throw errors_1.AssertionError.new(`Expected ${data} to be integer`);
        },
        decode(data, options) {
            let value;
            if (Number.isInteger(value = coder.decode(data, options))) {
                return value;
            }
            throw errors_1.DecodingError.new(`Could not decode data ${data} as integer`);
        },
        encode(data, options) {
            let value;
            if (Number.isInteger(value = coder.encode(data, options))) {
                return value;
            }
            throw errors_1.EncodingError.new(`Could not encode data ${data} to integer`);
        }
    };
}
exports.IntegerCoder = IntegerCoder;
//# sourceMappingURL=IntegerCoder.js.map