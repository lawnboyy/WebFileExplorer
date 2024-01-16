# Web File Explorer

## General

This is a web based file explorer built as a Single Page Application (SPA) with vanilla JavaScript with an ASP.NET
Core backend. It demonstrates several UI concepts such as simple state management, event publishing and subscribing,
and component based interfaces. The backend demonstrates how to build an index by walking the file tree and loading
the information into a database. Further work is planned to build an in-memory index.

This project was developed with Visual Studio 2019 Community edition in .NET 5. It generates a search index database
using localdb. So if you run this on a Windows machine with Visual Studio, it should just work. The index is built
once at start up as a background task. So search may be slow until the index is built as it will have to crawl the
file tree.

## Configuration

To configure the root file path, update the RootFilePath setting in the appsettings.json file at the root of the project.

## Downloads

Downloads will not work for all file extensions. Downloads will work for the common MIME types found here: 
https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types. Anything outside 
of that will need to be added to the appsettings.json file in the DownloadableFileExtensions section. This section is pulled and added 
to the file provider mappings in the Startup.cs.

## Interface

Manage Files: opens the File Manager dialog

Search: You can search by typing text into the text box and clicking the Search button 

Close: Closes the File Manager dialog

Up: Navigates to the parent directory if one exists.

Choose File: Opens a file dialog to select a local file to upload.

Upload: Uploads a file if one is selected.

Download: The download buttons are to the left of the file name. Clicking it will download the file.

Delete: The delete button is the trash icon between the download and the file name. It will confirm that you want to delete.

## Known Issues

1) Some special characters in directory names may break deep linking. Using a period '.' is known to break deep linking. There may
be other characters that break it as well.

2) Search will not work if the index has not been built yet and there are files or folders that the server cannot access due to
permissions.
