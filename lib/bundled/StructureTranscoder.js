"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
function StructureTranscoder(properties) {
    const knownKeys = Object.keys(properties);
    const knownKeysMap = knownKeys.reduce((acc, key) => (acc[key] = true, acc), Object.create(null));
    const knownEntries = Object.entries(properties);
    return {
        codingOptions: {},
        async pipe(data) {
            if (typeof data !== 'object' || data === null) {
                throw errors_1.AssertionError.new(`Expected ${data} to be object`);
            }
            const unknownKeys = Object.keys(data).filter(key => !knownKeysMap[key]);
            if (unknownKeys.length) {
                throw errors_1.AssertionError.new(`Found unknown keys ${unknownKeys} in structure`);
            }
            for (const [key, type] of knownEntries) {
                try {
                    await type.pipe(data[key]);
                }
                catch (err) {
                    throw errors_1.AssertionError.pushContext(err, { key, ref: this });
                }
            }
            return data;
        },
        async decode(data) {
            if (typeof data !== 'object' || data === null) {
                throw errors_1.DecodingError.new(`Could not decode data ${data} as structure`);
            }
            const result = {};
            for (const [key, type] of knownEntries) {
                try {
                    result[key] = await type.decode(data[key]);
                }
                catch (err) {
                    throw errors_1.DecodingError.pushContext(err, { key, ref: this });
                }
            }
            return result;
        },
        async encode(data) {
            if (typeof data !== 'object' || data === null) {
                throw errors_1.EncodingError.new(`Could not encode data ${data} to structure`);
            }
            const result = {};
            for (const [key, type] of knownEntries) {
                try {
                    result[key] = await type.encode(data[key]);
                }
                catch (err) {
                    throw errors_1.EncodingError.pushContext(err, { key, ref: this });
                }
            }
            return result;
        }
    };
}
exports.StructureTranscoder = StructureTranscoder;
//# sourceMappingURL=StructureTranscoder.js.map