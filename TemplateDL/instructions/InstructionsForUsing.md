# Purpose

The intention of the templateDL VS Code extension is to provide syntactical parsing and highlighting to files decorated with the Template Definition Language (TDL) meta commands.

# Assumption:

1. The **templateDL** extension is for _*Visual Studio Code_* (`VSCode`) product. See [Download Visual Studio Code](https://code.visualstudio.com/download)
2. Install `Node.js` in `VSCode`.<br>
   `Node.js` is not an extension or addon in the context of Visual Studio Code (`VSCode`). Rather, it is a runtime environment for executing JavaScript code outside   of a web browser. <br>
   In the context of `VSCode`, extensions or addons are additional functionality extending the capabilities of the editor. These extensions are typically written in   JavaScript or TypeScript and are installed within `VSCode` to provide features such as language support, debugging tools, version control integration, and more. <br>
   While `Node.js` is not an extension, it is a prerequisite for running many `VSCode` extensions because `VSCode` itself is upon the Electron framework, which uses Node.js as its runtime environment. Therefore, users need to have `Node.js` installed on their machines to run `VSCode` and its extensions effectively.<br><br>
   a. **Navigate to the `Node.js` website**: Go to the official [Node.js](https://nodejs.org/en) website to download the runtime environment.
   b. **Download the installer**: Go to the __Download__ page, which is available as a link in the menu items found across the top of the page.
   c. **Select the appropriate installer**: `Node.js` provides installers for various operating systems(OS). Select the [appropriate OS installer](https://nodejs.org/en/download) corresponding to the operating system (Windows, macOS, or Linux).
   d. **Run the installer**: After downloading the installer, run the installer. It guides the installation process with prompts and options for customizing the installation.
   e. **Verify the installation**: Once the installation is complete, verify that `Node.js` is installed correctly by opening a terminal or command prompt and typing the following command:
      ```
      node --version
      ````
      If `Node.js` is installed successfully, this command returns the installed version of `Node.js`. For example, `v16.17.0`.

# Instructions

The instructions for installing the Visual Studio Extension Installer (`VSIX`) file into `VSCode`
1. **Download the VSIX File**: Download the `VSIX` file from the [templateDL](https://github.com/DIDO-Solutions/TdlVSCode/tree/d9c727fe4a08dc1443f8da69cbdb9ecc0b182394/TemplateDL) source. It has a `.vsix` file extension.
2. **Open Visual Studio Code**: Launch __Visual Studio Code__. From the command-line, use `code .`
3. **Open Extensions View**: Once `VSCode` is open, use the __Activity Bar__ on the left side of the `VSCode` window to navigate to the __Extensions__ view. Either click on the building block icon for __Extensions__ on the __Activity Bar__ sidebar, or alternatively press `Ctrl+Shift+X` keys (Windows/Linux) or `Cmd+Shift+X` keys (Mac) to open the __Extensions__ view directly.
4. **Install Extension**: When the __Extensions__ activity is open it is highlighted within the __Activity Bar__. Within the __Primary Sidebar__ immediately to the left __Activity Bar__, a list of Installed extensions is provided. On the top left of this window, select the __Ellipses Menu__ (i.e., __Meatball Menu__) on the top left corner and select the `Install from VSIX` from the dropdown menu.
5. **Select VSIX File**: A file dialog opens. Navigate to location of the `VSIX` file downloaded (See step 1), select it and then use the __Install__ button to add it as an extension the `VSCode`.
6. **Install Extension**: After selecting the `VSIX` file, `VSCode` begins installing the extension, which may prompt to confirm the installation
7. **Restart Visual Studio Code**: Once the installation is complete, a dialog window is displayed that prompts to __RELOAD NOW__.
    ```
    Completed installing Template Definition Language Meta-Language Support extension from VSIX. Please reload Visual Studio Code to enable it.
    ```
    Select the  __Restart Now__ button to restart the editor with the templateDL extension.
8. **Verify Installation**: After restarting, verify the extension is installed by creating a `HelloWorld.tdl` or `HelloWorld.templateDL` file and adding templateDL content. For example:
    ```
    This is a templateDL HelloWorld Example:

    _#DEFINE myName Clem Kadiddlehopper

    Hello _&myName. how are you today _&startTimeStamp.

    _#EXIT 1 All done saying hello
    ```