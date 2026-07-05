/**
 * A single metadata field.
 */
export interface MetadataEntry {
    /**
     * Internal identifier.
     * Example: "DateTimeOriginal"
     */
    key: string;

    /**
     * Display name.
     * Example: "Date Taken"
     */
    label: string;

    /**
     * Value of the metadata field.
     */
    value: string | number | boolean | null;

    /**
     * Whether the value can be edited.
     */
    editable: boolean;
}

/**
 * A metadata handler for a specific file format.
 */
export interface MetadataHandler {
    /**
     * Reads metadata from a file.
     */
    read(file: File): Promise<MetadataEntry[]>;

    /**
     * Writes metadata to a file.
     */
    write(
        file: File,
        metadata: MetadataEntry[]
    ): Promise<File>;

    /**
     * Removes metadata from a file.
     */
    remove(file: File): Promise<File>;
}