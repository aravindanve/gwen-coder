"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const tag = 'UnionTranscoder';
function UnionTranscoder(...types) {
    if (types.length < 2)
        throw TypeError('UnionTranscoder expects at least 2 arguments');
    const typeDescription = types.map(type => type.typeDescription).join(' | ');
    const encodedTypeDescription = types.map(type => type.encodedTypeDescription).join(' | ');
    const count = types.length;
    return {
        tag,
        typeDescription,
        encodedTypeDescription,
        assert(value, options) {
            let promise = Promise.reject();
            for (let i = 0; i < count; i++) {
                promise = promise.catch(() => types[i].assert(value, options));
            }
            return promise.catch(err => Promise.reject(errors_1.AssertionError.pushContext(err, { tag, expected: typeDescription })));
        },
        decode(value, options) {
            let promise = Promise.reject();
            for (let i = 0; i < count; i++) {
                promise = promise.catch(() => types[i].decode(value, options));
            }
            return promise.catch(err => Promise.reject(errors_1.DecodingError.pushContext(err, { tag, expected: typeDescription })));
        },
        encode(value, options) {
            let promise = Promise.reject();
            for (let i = 0; i < count; i++) {
                promise = promise.catch(() => types[i].encode(value, options));
            }
            return promise.catch(err => Promise.reject(errors_1.EncodingError.pushContext(err, { tag, expected: encodedTypeDescription })));
        }
    };
}
exports.UnionTranscoder = UnionTranscoder;
//# sourceMappingURL=UnionTranscoder.js.map