export const fetchDirectory = async (path) => {
    const response = await fetch(path ? `/directories?path=${path}` : "/directories");
    return response.json();
};

export const search = async (term) => {
    const response = await fetch(`/files?term=${term}`);
    return response.json();
};