"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
exports.RecordTranscoder = (key, value) => ({
    async assert(data, options) {
        if (typeof data !== 'object' || data === null) {
            throw errors_1.AssertionError.new(`Expected ${data} to be object`);
        }
        for (const [_key, _value] of Object.entries(data)) {
            try {
                await key.assert(_key, options);
                await value.assert(_value, options);
            }
            catch (err) {
                throw errors_1.AssertionError.pushContext(err, { key: _key, ref: this });
            }
        }
        return data;
    },
    async decode(data, options) {
        if (typeof data !== 'object' || data === null) {
            throw errors_1.DecodingError.new(`Could not decode data ${data} as structure`);
        }
        const result = {};
        for (const [_key, _value] of Object.entries(data)) {
            try {
                result[await key.decode(_key, options)] = await value.decode(_value, options);
            }
            catch (err) {
                throw errors_1.DecodingError.pushContext(err, { key: _key, ref: this });
            }
        }
        return result;
    },
    async encode(data, options) {
        if (typeof data !== 'object' || data === null) {
            throw errors_1.EncodingError.new(`Could not encode data ${data} to structure`);
        }
        const result = {};
        for (const [_key, _value] of Object.entries(data)) {
            try {
                result[await key.encode(_key, options)] = await value.encode(_value, options);
            }
            catch (err) {
                throw errors_1.EncodingError.pushContext(err, { key: _key, ref: this });
            }
        }
        return result;
    }
});
//# sourceMappingURL=RecordTranscoder.js.map