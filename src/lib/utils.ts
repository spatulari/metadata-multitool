/**
 * Reads a File as an ArrayBuffer.
 */
export async function readAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return await file.arrayBuffer();
}

/**
 * Reads a File as text.
 */
export async function readAsText(file: File): Promise<string> {
    return await file.text();
}

/**
 * Creates a new File from binary data.
 */
export function createFile(
    data: BlobPart,
    original: File,
    type = original.type
): File {
    return new File([data], original.name, {
        type,
        lastModified: Date.now()
    });
}

/**
 * Converts bytes into a human-readable size.
 */
export function formatBytes(bytes: number): string {
    const units = ["B", "KB", "MB", "GB", "TB"];

    let size = bytes;
    let unit = 0;

    while (size >= 1024 && unit < units.length - 1) {
        size /= 1024;
        unit++;
    }

    return `${size.toFixed(unit === 0 ? 0 : 2)} ${units[unit]}`;
}

/**
 * Converts an ArrayBuffer into a Uint8Array.
 */
export function toUint8(buffer: ArrayBuffer): Uint8Array {
    return new Uint8Array(buffer);
}

/**
 * Returns a slice of a Uint8Array.
 */
export function sliceBytes(
    bytes: Uint8Array,
    start: number,
    end?: number
): Uint8Array {
    return bytes.slice(start, end);
}

/**
 * Checks whether a Uint8Array starts with a given signature.
 */
export function startsWith(
    bytes: Uint8Array,
    signature: number[]
): boolean {
    if (bytes.length < signature.length) return false;

    for (let i = 0; i < signature.length; i++) {
        if (bytes[i] !== signature[i]) {
            return false;
        }
    }

    return true;
}

/**
 * Downloads a File in the browser.
 */
export function downloadFile(file: File): void {
    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();

    URL.revokeObjectURL(url);
}