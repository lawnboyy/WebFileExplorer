// Build a dictionary of UTF-8 encodings
const decodeMapping = {
  "%20": " ",
  "%21": "!",
  "%23": "#",
  "%24": "$",
  "%26": "&",
  "%28": "(",
  "%29": ")",
  "%2B": "+",
  "%5C": "\\"
};

const encodeMapping = {
  " ": "%20",
  "!": "%21",
  "#": "%23",
  "$": "%24",
  "&": "%26",
  "(": "%28",
  ")": "%29",
  "+": "%2B",
  "\\": "%5C"
};

/**
 * Decode the URL path to restore the original characters that
 * were encoded.
 * @param {string} path The path to decode
 * @returns {string} The decoded path.
 */
export function decodeUrl(path) {
  let decoded = path;
  Object.keys(decodeMapping).forEach((key => {
    decoded = decoded.replaceAll(key, decodeMapping[key])
  }));

  return decoded;
}

/**
 * Encode the URL path to escape special characters that will
 * appear in file paths (right now just spaces and backslashes).
 * @param {string} path
 * @return {string} The encoded path.
 */
export function encodeUrl(path) {
  let encoded = path;
  Object.keys(encodeMapping).forEach((key => {
    encoded = encoded.replaceAll(key, encodeMapping[key])
  }));

  return encoded;
}