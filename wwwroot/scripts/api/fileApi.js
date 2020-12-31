export const fetchFiles = async (path) => {
    const response = await fetch(path ? `/files?path=${path}` : "/files");
    return response.json();
};