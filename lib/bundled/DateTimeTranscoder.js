"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
exports.DateTimeTranscoder = () => ({
    pipe(data) {
        if (Object.prototype.toString.call(data) === '[object Date]' && !isNaN(data.getTime())) {
            return data;
        }
        throw errors_1.AssertionError.new(`Expected ${data} to be Date`);
    },
    decode(data) {
        if (typeof data === 'string') {
            const date = new Date(data);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        throw errors_1.DecodingError.new(`Could not decode data ${data} as Date`);
    },
    encode(data) {
        if (Object.prototype.toString.call(data) === '[object Date]') {
            try {
                return data.toISOString();
            }
            catch (_a) {
            }
        }
        throw errors_1.EncodingError.new(`Could not encode data ${data} to date-time string`);
    }
});
//# sourceMappingURL=DateTimeTranscoder.js.map