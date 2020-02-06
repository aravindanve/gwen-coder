"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const tag = 'UndefinedCoder';
const typeDescription = 'undefined';
exports.UndefinedCoder = () => ({
    tag,
    typeDescription,
    encodedTypeDescription: typeDescription,
    assert(value) {
        return value === undefined
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }));
    },
    decode(value) {
        return value === undefined
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }));
    },
    encode(value) {
        return value === undefined
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription }));
    }
});
//# sourceMappingURL=UndefinedCoder.js.map