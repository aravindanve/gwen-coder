"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
function NumberCoder(options) {
    const codingOptions = Object.assign({ coerceOnDecode: false }, options);
    return {
        codingOptions,
        pipe(data) {
            if (typeof data === 'number' && !isNaN(data)) {
                return data;
            }
            throw errors_1.AssertionError.new(`Expected ${data} to be number`);
        },
        decode(data) {
            if (typeof data === 'number' && !isNaN(data)) {
                return data;
            }
            if (codingOptions.coerceOnDecode) {
                switch (typeof data) {
                    case 'boolean':
                        return data ? 1 : 0;
                    case 'string':
                        if (!isNaN(+data)) {
                            return +data;
                        }
                        break;
                }
            }
            throw errors_1.DecodingError.new(`Could not decode data ${data} as number`);
        },
        encode(data) {
            if (typeof data === 'number' && !isNaN(data)) {
                return data;
            }
            throw errors_1.EncodingError.new(`Could not encode data ${data} to number`);
        }
    };
}
exports.NumberCoder = NumberCoder;
//# sourceMappingURL=NumberCoder.js.map