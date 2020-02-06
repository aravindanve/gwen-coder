"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const tag = 'DateTimeTranscoder';
const typeDescription = 'Date';
const encodedTypeDescription = 'string (date-time)';
exports.DateTimeTranscoder = () => ({
    tag,
    typeDescription,
    encodedTypeDescription,
    assert(value) {
        return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())
            ? Promise.resolve(value)
            : Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }));
    },
    decode(value) {
        if (typeof value === 'string') {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                return Promise.resolve(date);
            }
        }
        return Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }));
    },
    encode(value) {
        return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())
            ? Promise.resolve(value.toISOString())
            : Promise.reject(new errors_1.EncodingError({ tag, value, expected: encodedTypeDescription }));
    }
});
//# sourceMappingURL=DateTimeTranscoder.js.map