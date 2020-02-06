"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const tag = 'ConfiguredTranscoder';
function ConfiguredTranscoder(type, codingOptions) {
    const typeDescription = `Configured<${type.typeDescription}>`;
    const encodedTypeDescription = `Configured<${type.encodedTypeDescription}>`;
    return {
        tag,
        typeDescription,
        encodedTypeDescription,
        codingOptions,
        setCodingOptions: options => (Object.assign(codingOptions, options), void 0),
        assert: (value) => type.assert(value, codingOptions).catch(err => Promise.reject(errors_1.AssertionError.pushContext(err, { tag, expected: typeDescription }))),
        decode: (value) => type.decode(value, codingOptions).catch(err => Promise.reject(errors_1.DecodingError.pushContext(err, { tag, expected: typeDescription }))),
        encode: (value) => type.encode(value, codingOptions).catch(err => Promise.reject(errors_1.EncodingError.pushContext(err, { tag, expected: encodedTypeDescription }))),
    };
}
exports.ConfiguredTranscoder = ConfiguredTranscoder;
//# sourceMappingURL=ConfiguredTranscoder.js.map