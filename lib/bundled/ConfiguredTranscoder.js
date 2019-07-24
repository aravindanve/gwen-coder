"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ConfiguredTranscoder(coder, codingOptions) {
    return {
        codingOptions,
        setCodingOptions(options) {
            Object.assign(codingOptions, options);
        },
        pipe: (data) => coder.pipe(data, codingOptions),
        decode: (data) => coder.decode(data, codingOptions),
        encode: (data) => coder.encode(data, codingOptions)
    };
}
exports.ConfiguredTranscoder = ConfiguredTranscoder;
//# sourceMappingURL=ConfiguredTranscoder.js.map