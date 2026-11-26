export type Tags = Record<string,string>;
export interface Artwork {mime:string;data:Uint8Array}
export interface Metadata {format:'mp3'|'wav';tags:Tags;artwork?:Artwork;properties:{channels?:number;sampleRate?:number;bitrate?:number;durationSeconds?:number}}
export function readMetadata(bytes:Uint8Array):Metadata;
export function writeMetadata(bytes:Uint8Array,patch:Tags,artwork?:Artwork|null):Uint8Array;
export function audioPayload(bytes:Uint8Array):Uint8Array;
