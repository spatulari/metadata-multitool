import { getHandler } from "./registry.ts";
import type { MetadataEntry, MetadataHandler } from "./types.ts";

/**
 * Returns the metadata handler for a file, or null if unsupported.
 */
export function getMetadataHandler(file: File): MetadataHandler | null {
    return getHandler(file);
}

/**
 * Reads all metadata from a file.
 */
export async function readMetadata(file: File): Promise<MetadataEntry[]> {
    const handler = getHandler(file);

    if (!handler) {
        throw new Error(`Unsupported file type: ${file.type}`);
    }

    return handler.read(file);
}

/**
 * Removes metadata from a file.
 */
export async function removeMetadata(file: File): Promise<File> {
    const handler = getHandler(file);

    if (!handler) {
        throw new Error(`Unsupported file type: ${file.type}`);
    }

    return handler.remove(file);
}

/**
 * Writes updated metadata back to a file.
 */
export async function writeMetadata(
    file: File,
    metadata: MetadataEntry[]
): Promise<File> {
    const handler = getHandler(file);

    if (!handler) {
        throw new Error(`Unsupported file type: ${file.type}`);
    }

    return handler.write(file, metadata);
}

/**
 * Returns whether this file type is supported.
 */
export function isSupported(file: File): boolean {
    return getHandler(file) !== null;
}