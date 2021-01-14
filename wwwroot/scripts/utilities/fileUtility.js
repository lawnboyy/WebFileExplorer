/**
 * Format the given disk size to display in gigabytes (GB),
 * megabytes (MB), kilobytes (kB), or bytes (B).
 * @param {any} sizeInBytes The size in bytes to format.
 */
export function formatDiskSize(sizeInBytes) {
  if (sizeInBytes < 1000) {
    // Show in bytes
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1000000) {
    // Show in Kilobytes
    return `${(sizeInBytes / 1000).toFixed(2)} kB`;
  } else if (sizeInBytes < 1000000000) {
    // Show in Megabytes
    return `${(sizeInBytes / 1000000).toFixed(2)} MB`;
  } else {
    // Show in Gigabytes
    return `${(sizeInBytes / 1000000000).toFixed(2)} GB`;
  }
}