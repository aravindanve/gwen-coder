"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
exports.ListTranscoder = (type) => ({
    async pipe(data, options) {
        if (!Array.isArray(data)) {
            throw errors_1.AssertionError.new(`Expected ${data} to be array`);
        }
        for (const [key, value] of data.entries()) {
            try {
                await type.pipe(value, options);
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
        for (const [key, value] of data.entries()) {
            try {
                result.push(await type.decode(value, options));
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
        for (const [key, value] of data.entries()) {
            try {
                result.push(await type.encode(value, options));
            }
            catch (err) {
                throw errors_1.EncodingError.pushContext(err, { key, ref: this });
            }
        }
        return result;
    }
});
//# sourceMappingURL=ListTranscoder.js.map