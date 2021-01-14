// TODO: Build a dictionary of UTF-8 encodings to use here instead of
// applying just spaces and back slashes.

/**
 * Decode the URL path to restore the original characters that
 * were encoded.
 * @param {string} path The path to decode
 * @returns {string} The decoded path.
 */
export function decodeUrl(path) {
  return path
    .replaceAll("%20", " ")
    .replaceAll("%5C", "\\");
}

/**
 * Encode the URL path to escape special characters that will
 * appear in file paths (right now just spaces and backslashes).
 * @param {string} path
 * @return {string} The encoded path.
 */
export function encodeUrl(path) {
  return path.replaceAll("\\", "%5C").replaceAll(" ", "%20");
}