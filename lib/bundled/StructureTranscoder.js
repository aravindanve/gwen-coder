"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const errors_1 = require("../errors");
const tag = 'StructureTranscoder';
function StructureTranscoder(props) {
    const knownKeys = Object.keys(props);
    const knownKeysMap = knownKeys.reduce((acc, key) => (acc[key] = true, acc), Object.create(null));
    const typeDescription = `{ ${knownKeys.reduce((acc, key) => (acc.push(`${key}: ${props[key].typeDescription}`), acc), []).join(', ')} }`;
    const encodedTypeDescription = `{ ${knownKeys.reduce((acc, key) => (acc.push(`${key}: ${props[key].encodedTypeDescription}`), acc), []).join(', ')} }`;
    return {
        tag,
        typeDescription,
        encodedTypeDescription,
        assert(value, options) {
            if (value === null || typeof value !== 'object') {
                return Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }));
            }
            if (!(options ? options.ignoreExtraOnAssert : shared_1.defaultCodingOptions.ignoreExtraOnAssert)) {
                const extra = Object.keys(value).find(key => !knownKeysMap[key]);
                if (extra) {
                    return Promise.reject(new errors_1.AssertionError({ tag, value, expected: typeDescription }, `Found unknown key ${extra} in structure`));
                }
            }
            return Promise.all(knownKeys.map(key => props[key].assert(value[key], options)))
                .then(() => value)
                .catch(err => Promise.reject(errors_1.AssertionError.pushContext(err, { tag, expected: typeDescription })));
        },
        decode(value, options) {
            if (value === null || typeof value !== 'object') {
                return Promise.reject(new errors_1.DecodingError({ tag, value, expected: typeDescription }));
            }
            return Promise.all(knownKeys.map(key => props[key].decode(value[key], options)))
                .then(values => values.reduce((acc, value, i) => (acc[knownKeys[i]] = value, acc), {}))
                .catch(err => Promise.reject(errors_1.DecodingError.pushContext(err, { tag, expected: typeDescription })));
        },
        encode(value, options) {
            if (value === null || typeof value !== 'object') {
                return Promise.reject(new errors_1.EncodingError({ tag, value, expected: typeDescription }));
            }
            return Promise.all(knownKeys.map(key => props[key].encode(value[key], options)))
                .then(values => values.reduce((acc, value, i) => (acc[knownKeys[i]] = value, acc), {}))
                .catch(err => Promise.reject(errors_1.EncodingError.pushContext(err, { tag, expected: typeDescription })));
        }
    };
}
exports.StructureTranscoder = StructureTranscoder;
//# sourceMappingURL=StructureTranscoder.js.map