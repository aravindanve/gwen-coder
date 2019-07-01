"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
exports.UndefinedCoder = () => ({
    codingOptions: {},
    pipe(data) {
        if (data === undefined) {
            return data;
        }
        throw errors_1.AssertionError.new(`Expected ${data} to be undefined`);
    },
    decode(data) {
        if (data === undefined) {
            return data;
        }
        throw errors_1.DecodingError.new(`Could not decode data ${data} as undefined`);
    },
    encode(data) {
        if (data === undefined) {
            return data;
        }
        throw errors_1.EncodingError.new(`Could not encode data ${data} to undefined`);
    }
});
//# sourceMappingURL=UndefinedCoder.js.map