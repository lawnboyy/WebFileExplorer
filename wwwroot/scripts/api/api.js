/**
 * Makes an API call to delete the given file
 * @param {string} path Full path to the file to delete.
 */
export const deleteFile = async (path) => {
  const response = await fetch(`/files?path=${path}`, {
    method: "DELETE",
  });

  return response;
};

/**
 * Makes an API call to download a file from the server.
 * @param {object} file The file object to download.
 * @param {string} file.name The name of the file.
 */
export const downloadFile = async (file) => {
  const response = await fetch("/files/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(file)
  });

  const result = await response.json();

  // Create a download link and click it to trigger
  // the browser file download.
  const path = result.downloadPath;
  const link = document.createElement("a");
  link.href = path;
  link.setAttribute("download", file.name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Makes an API call to pull the contents of a directory.
 * @param {string} path The full path to the directory.
 * @returns {object} The directory object.
 */
export const fetchDirectory = async (path) => {
  const response = await fetch(path ? `/directories?path=${path}` : "/directories");
  return response.json();
};

/**
 * Makes an API call to search for all files whose name contains or matches
 * the given search term.
 * @param {string} term The search term to match against file names.
 * @param {object[]} The search results as an array of file objects.
 */
export const search = async (term) => {
  const response = await fetch(`/files?term=${term}`);
  return response.json();
};

/**
 * Makes an API call to search for all files whose name contains or matches
 * the given search term.
 * @param {string} term - The search term to match against file names.
 */
export const uploadFile = async (path, file) => {
  const formData = new FormData();
  formData.append("files", file);
  const response = await fetch(path ? `/files/upload?path=${path}` : `/files/upload`, {
    method: "POST",
    body: formData
  });

  return response;
};