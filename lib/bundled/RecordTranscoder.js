"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const tag = 'RecordTranscoder';
exports.RecordTranscoder = (keyType, valueType) => {
    const typeDescription = `{ [key: ${keyType.typeDescription}]: ${valueType.typeDescription} }`;
    const encodedTypeDescription = `{ [key: ${keyType.encodedTypeDescription}]: ${valueType.encodedTypeDescription} }`;
    return {
        tag,
        typeDescription,
        encodedTypeDescription,
        assert(value, options) {
            if (value === null || typeof value !== 'object') {
                return Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }));
            }
            const keys = Object.keys(value);
            const kPromises = Promise.all(keys.map(key => keyType.assert(key, options)));
            const vPromises = Promise.all(keys.map(key => valueType.assert(value[key], options)));
            return Promise.all([kPromises, vPromises])
                .then(() => value)
                .catch(err => Promise.reject(errors_1.AssertionError.pushContext(err, { tag, expected: typeDescription })));
        },
        decode(value, options) {
            if (value === null || typeof value !== 'object') {
                return Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }));
            }
            const keys = Object.keys(value);
            const kPromises = Promise.all(keys.map(key => keyType.decode(key, options)));
            const vPromises = Promise.all(keys.map(key => valueType.decode(value[key], options)));
            return Promise.all([kPromises, vPromises])
                .then(([keys, values]) => keys.reduce((acc, key, i) => (acc[key] = values[i], acc), {}))
                .catch(err => Promise.reject(errors_1.DecodingError.pushContext(err, { tag, expected: typeDescription })));
        },
        encode(value, options) {
            if (value === null || typeof value !== 'object') {
                return Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription }));
            }
            const keys = Object.keys(value);
            const kPromises = Promise.all(keys.map(key => keyType.encode(key, options)));
            const vPromises = Promise.all(keys.map(key => valueType.encode(value[key], options)));
            return Promise.all([kPromises, vPromises])
                .then(([keys, values]) => keys.reduce((acc, key, i) => (acc[key] = values[i], acc), {}))
                .catch(err => Promise.reject(errors_1.EncodingError.pushContext(err, { tag, expected: typeDescription })));
        }
    };
};
//# sourceMappingURL=RecordTranscoder.js.map