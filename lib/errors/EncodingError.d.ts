import { TranscoderError, TranscoderErrorOrigin } from '../TranscoderError';
export declare class EncodingError extends TranscoderError {
    constructor(ctx: TranscoderErrorOrigin, message?: string);
}
