import type { MetadataHandler } from "./types.ts";

import * as jpeg from "./formats/jpeg.ts";
// import * as png from "./formats/png";
// import * as pdf from "./formats/pdf";
// import * as mp3 from "./formats/mp3";

const handlers = new Map<string, MetadataHandler>([
    ["image/jpeg", jpeg],
    ["image/jpg", jpeg],

    // ["image/png", png],
    // ["application/pdf", pdf],
    // ["audio/mpeg", mp3],
]);

/**
 * Returns the metadata handler for a file, or null if unsupported.
 */
export function getHandler(file: File): MetadataHandler | null {
    return handlers.get(file.type) ?? null;
}

/**
 * Returns whether a MIME type is supported.
 */
export function hasHandler(type: string): boolean {
    return handlers.has(type);
}

/**
 * Returns all supported MIME types.
 */
export function getSupportedTypes(): readonly string[] {
    return [...handlers.keys()];
}