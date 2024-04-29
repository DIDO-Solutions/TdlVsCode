# Welcome to TemplateDL VS Code Extension

## What's in the folder

* This folder contains all of the files necessary for the TemplateDL extension.
* `package.json` - is a crucial component in `Node.js` for Visual Studio Code extensions. It serves several purposes:
   * Metadata: It contains metadata about the project, including its name, version, description, author, and license information.
   * Dependencies: It lists the project's dependencies, including both runtime and development dependencies. These dependencies are typically `Node.js` packages that the project relies on.
   * Scripts: It defines various scripts that can be executed using npm or yarn. These scripts can perform tasks like building the project, running tests, or deploying the application.
   * Configuration: It includes configuration settings for the project. In the context of Visual Studio Code extensions, this may include configuration related to the extension's behavior, such as activation events, contribution points, or settings.
   * Engines: It specifies the versions of Node.js and other dependencies that the project is compatible with.
   * Contribution Points: For Visual Studio Code extensions specifically, the package.json file defines contribution points that determine how the extension integrates with Visual Studio Code, such as language support, commands, themes, and more.
* `syntaxes/templateDL.tmLanguage.json` - this is the Text mate grammar file that is used for tokenization.
* `language-configuration.json` - this is the language configuration, defining the tokens that are used for comments and brackets.

## Get up and running straight away

* Make sure the language configuration settings in `language-configuration.json` are accurate.
* Press `F5` to open a new window with the TemplateDL extension loaded.
* Create a new file with a file name suffix matching the TemplateDL language (e.g., `HelloWorld.tdl` or `HelloWorld.templateDL`) .
* Verify that syntax highlighting works and that the language configuration settings are working. Use the `Cmd+Shift+P` on the Mac and select the `Developer: Inspect Editor Tokens and Scopes` while in the TemplateDL Language file and place the pointer onto elements within the file.

## Make changes

* Relaunch the extension from the debug toolbar after making changes to the files listed above.
* Reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with the changes made to TemplateDL extension.

## Add more language features

* To add features such as IntelliSense, hovers and validators check out the VS Code extenders documentation at https://code.visualstudio.com/docs

## Install your extension

* To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder or the `~/.vscode/extensions` on Linux, Unix and Mac or `%USERPROFILE%\.vscode` on Windows. Once the copy is completed, restart Code.
* To share your extension with the world, read on https://code.visualstudio.com/docs about publishing an extension.
