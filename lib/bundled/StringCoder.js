"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
function StringCoder(options) {
    const codingOptions = Object.assign({ coerceOnDecode: false }, options);
    return {
        codingOptions,
        pipe(data) {
            if (typeof data === 'string') {
                return data;
            }
            throw errors_1.AssertionError.new(`Expected ${data} to be string`);
        },
        decode(data) {
            if (typeof data === 'string') {
                return data;
            }
            if (codingOptions.coerceOnDecode) {
                switch (typeof data) {
                    case 'number':
                    case 'boolean':
                        return '' + data;
                }
            }
            throw errors_1.DecodingError.new(`Could not decode data ${data} as string`);
        },
        encode(data) {
            if (typeof data === 'string') {
                return data;
            }
            throw errors_1.EncodingError.new(`Could not encode data ${data} to string`);
        }
    };
}
exports.StringCoder = StringCoder;
//# sourceMappingURL=StringCoder.js.map