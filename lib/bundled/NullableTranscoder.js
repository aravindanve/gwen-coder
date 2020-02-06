"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NullCoder_1 = require("./NullCoder");
const UnionTranscoder_1 = require("./UnionTranscoder");
exports.NullableTranscoder = (type) => UnionTranscoder_1.UnionTranscoder(NullCoder_1.NullCoder(), type);
//# sourceMappingURL=NullableTranscoder.js.map