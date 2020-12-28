export const fetchFiles = async () => {
    const response = await fetch("/files");
    return response.json();
};