"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tag = 'AnyCoder';
const typeDescription = 'any';
exports.AnyCoder = () => ({
    tag,
    typeDescription,
    encodedTypeDescription: typeDescription,
    assert: value => Promise.resolve(value),
    decode: value => Promise.resolve(value),
    encode: value => Promise.resolve(value)
});
//# sourceMappingURL=AnyCoder.js.map