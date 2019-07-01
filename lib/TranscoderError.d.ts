import { Transcoder } from './shared';
export declare type TranscoderErrorContext = {
    key: string | number;
    ref: Transcoder<any, any>;
};
export declare class TranscoderError extends Error {
    readonly trace: TranscoderErrorContext[];
    protected constructor(ctx?: TranscoderErrorContext, message?: string);
    readonly path: string;
    static new(message?: string, ctx?: TranscoderErrorContext): TranscoderError;
    static pushContext(error: any, ctx: TranscoderErrorContext): TranscoderError;
}
