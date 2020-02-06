import { Transcoder, CodingOptions } from '../shared';
export interface ConfiguredTranscoder<T, E> extends Transcoder<T, E> {
    codingOptions: CodingOptions;
    setCodingOptions(options: CodingOptions): void;
}
export declare function ConfiguredTranscoder<T, E>(type: Transcoder<T, E>, codingOptions: CodingOptions): ConfiguredTranscoder<T, E>;
