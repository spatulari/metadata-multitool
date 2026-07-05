import type { MetadataEntry } from "../types.ts";

/**
 * Reads metadata from a JPEG image.
 */
export async function read(file: File): Promise<MetadataEntry[]> {
    // TODO:
    // Parse the JPEG structure.
    // Locate the APP1 (EXIF) segment.
    // Extract EXIF, IPTC and XMP metadata.

    return [
        {
            label: "File Name",
            key: "Filename",
            value: file.name,
            editable: false
        },
        {
            label: "File Size",
            key: "Size",
            value: `${file.size} bytes`,
            editable: false
        },
        {
            label: "File Type",
            key: "Type",
            value: file.type,
            editable: false
        }
    ];
}

/**
 * Writes updated metadata to a JPEG.
 */
export async function write(
    file: File,
    metadata: MetadataEntry[]
): Promise<File> {
    // TODO:
    // Serialize the updated EXIF block.
    // Replace the existing APP1 segment.
    // Return a new File.

    console.warn("JPEG metadata writing is not implemented.", metadata);

    return file;
}

/**
 * Removes metadata from a JPEG.
 */
export async function remove(file: File): Promise<File> {
    // TODO:
    // Copy every JPEG segment except:
    //  - APP1 (EXIF)
    //  - APP13 (IPTC)
    //  - XMP metadata
    // Preserve the image data unchanged.

    console.warn("JPEG metadata removal is not implemented.");

    return file;
}