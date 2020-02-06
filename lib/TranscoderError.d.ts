export declare type TranscoderContext = {
    readonly tag: string;
    readonly expected: string;
    readonly key?: string | number;
};
export declare type TranscoderErrorOrigin = TranscoderContext & {
    readonly value: any;
};
export declare class TranscoderError extends Error {
    readonly value: any;
    readonly trace: TranscoderContext[];
    readonly path: string;
    constructor(ctx: TranscoderErrorOrigin, message?: string);
    static pushContext(err: TranscoderError, ctx: TranscoderContext): TranscoderError;
}
