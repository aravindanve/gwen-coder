import { TranscoderError, TranscoderErrorOrigin } from '../TranscoderError';
export declare class DecodingError extends TranscoderError {
    constructor(ctx: TranscoderErrorOrigin, message?: string);
}
