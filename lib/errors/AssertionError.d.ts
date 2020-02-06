import { TranscoderError, TranscoderErrorOrigin } from '../TranscoderError';
export declare class AssertionError extends TranscoderError {
    constructor(ctx: TranscoderErrorOrigin, message?: string);
}
