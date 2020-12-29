import { Button } from "./components/button.js";
import { FileDialog } from "./components/fileDialog.js";

const root = document.getElementById("root");
const fileDialog = FileDialog("fileDialog", "File Manager");

const onFileManagementButtonClicked = () => {
    fileDialog.open = true;
};

root.appendChild(fileDialog);
root.appendChild(Button("fileManagementButton", "Manage Files", onFileManagementButtonClicked));

// If we have some state in the URL, then open the dialog.
if (window.location.pathname && window.location.pathname !== "/") {
    fileDialog.open = true;
}


