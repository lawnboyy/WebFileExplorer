export function decodeUrl(path) {
    return path
        .replace("-0-", " ")
        .replaceAll("-1-", "\\");
}

export function encodeUrl(path) {
    return path.replaceAll("\\", "-1-").replaceAll(" ", "-0-");
}