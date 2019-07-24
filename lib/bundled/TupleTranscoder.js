"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const defaults_1 = require("../defaults");
function TupleTranscoder(...types) {
    return {
        async pipe(data, options) {
            if (!Array.isArray(data)) {
                throw errors_1.AssertionError.new(`Expected ${data} to be array`);
            }
            if (!(options ? options.ignoreExtraOnPipe : defaults_1.defaultCodingOptions.ignoreExtraOnPipe)) {
                if (types.length !== data.length) {
                    throw errors_1.AssertionError.new(`Expected ${types.length} but found ${data.length} items in tuple`);
                }
            }
            for (const [key, type] of types.entries()) {
                try {
                    await type.pipe(data[key], options);
                }
                catch (err) {
                    throw errors_1.AssertionError.pushContext(err, { key, ref: this });
                }
            }
            return data;
        },
        async decode(data, options) {
            if (!Array.isArray(data)) {
                throw errors_1.DecodingError.new(`Could not decode data ${data} as array`);
            }
            const result = [];
            for (const [key, type] of types.entries()) {
                try {
                    result.push(await type.decode(data[key], options));
                }
                catch (err) {
                    throw errors_1.DecodingError.pushContext(err, { key, ref: this });
                }
            }
            return result;
        },
        async encode(data, options) {
            if (!Array.isArray(data)) {
                throw errors_1.EncodingError.new(`Could not encode data ${data} to array`);
            }
            const result = [];
            for (const [key, type] of types.entries()) {
                try {
                    result.push(await type.encode(data[key], options));
                }
                catch (err) {
                    throw errors_1.EncodingError.pushContext(err, { key, ref: this });
                }
            }
            return result;
        }
    };
}
exports.TupleTranscoder = TupleTranscoder;
//# sourceMappingURL=TupleTranscoder.js.map