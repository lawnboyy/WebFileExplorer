export const downloadFile = async (file) => {
  const response = await fetch("/files/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(file)
  });

  const result = await response.json();

  const path = result.downloadPath;
  const link = document.createElement("a");
  link.href = path;
  const parts = path.split(["/"]);
  link.setAttribute("download", parts[parts.length - 1]);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const fetchDirectory = async (path) => {
  const response = await fetch(path ? `/directories?path=${path}` : "/directories");
  return response.json();
};

export const search = async (term) => {
  const response = await fetch(`/files?term=${term}`);
  return response.json();
};

export const uploadFile = async (path, file) => {
  const formData = new FormData();
  formData.append("files", file);
  const response = await fetch(path ? `/files/upload?path=${path}` : `/files/upload`, {
    method: "POST",
    body: formData    
  });
};