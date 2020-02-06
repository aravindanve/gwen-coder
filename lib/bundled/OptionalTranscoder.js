"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UndefinedCoder_1 = require("./UndefinedCoder");
const UnionTranscoder_1 = require("./UnionTranscoder");
exports.OptionalTranscoder = (type) => UnionTranscoder_1.UnionTranscoder(UndefinedCoder_1.UndefinedCoder(), type);
//# sourceMappingURL=OptionalTranscoder.js.map