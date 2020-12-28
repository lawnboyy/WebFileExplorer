import { Button } from "./components/button.js";
import { FileDialog } from "./components/fileDialog.js";

const root = document.getElementById("root");
const fileDialog = FileDialog("fileDialog", "File Manager");

const onFileManagementButtonClicked = () => {
    fileDialog.open = true;
};

root.appendChild(fileDialog);
root.appendChild(Button("fileManagementButton", "Manage Files", onFileManagementButtonClicked));