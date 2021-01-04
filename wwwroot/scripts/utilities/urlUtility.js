export function decodeUrl(path) {
    return path
        .replace("%20", " ")
        .replaceAll("%5C", "\\");
}

export function encodeUrl(path) {
    return path.replaceAll("\\", "%5C").replaceAll(" ", "%20");
}