"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
function Transcoder(transcoder) {
    return Object.assign({ codingOptions: {}, pipe() {
            throw errors_1.AssertionError.new('Not implemented');
        },
        decode() {
            throw errors_1.DecodingError.new('Not implemented');
        },
        encode() {
            throw errors_1.EncodingError.new('Not implemented');
        } }, transcoder);
}
exports.Transcoder = Transcoder;
//# sourceMappingURL=Transcoder.js.map