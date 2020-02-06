"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const tag = 'ListTranscoder';
exports.ListTranscoder = (type) => {
    const typeDescription = `Array<${type.typeDescription}>`;
    const encodedTypeDescription = `Array<${type.encodedTypeDescription}>`;
    return {
        tag,
        typeDescription,
        encodedTypeDescription,
        assert(value, options) {
            return !Array.isArray(value)
                ? Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }))
                : Promise.all(value.map((_value, i) => type.assert(_value, options)
                    .catch(err => Promise.reject(errors_1.AssertionError.pushContext(err, { tag, key: i, expected: typeDescription })))))
                    .then(() => value);
        },
        decode(value, options) {
            return !Array.isArray(value)
                ? Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }))
                : Promise.all(value.map((_value, i) => type.decode(_value, options)
                    .catch(err => Promise.reject(errors_1.DecodingError.pushContext(err, { tag, key: i, expected: typeDescription })))));
        },
        encode(value, options) {
            return !Array.isArray(value)
                ? Promise.reject(new errors_1.EncodingError({ tag, value, expected: encodedTypeDescription }))
                : Promise.all(value.map((_value, i) => type.encode(_value, options)
                    .catch(err => Promise.reject(errors_1.EncodingError.pushContext(err, { tag, key: i, expected: encodedTypeDescription })))));
        }
    };
};
//# sourceMappingURL=ListTranscoder.js.map