# tdl README

This is the README for extension Template Definition Language (tdl) files. TDL is a Meta-Language that controls the output produced by the Template Processor. The Template Processor reads and input file (i.e., template) decorates with TDL commands that help control and generate an transformed output file. The TDL Meta-Commands are described using Backus Naur Form (BNF) notation. See (TDL.BNF).

## Features

A TDL file is any language specific file (i.e., C/C++. C#, Java, JavaScript, Bash, SQL, CSS, HTML, etc). 
The files are intended to be processed to produce a new file as an output. The output file should
be conformant with the language specific rules.

LanguageSpecificFile+TDL Commands --> TDL Processor --> LanguageSpecificFile

## Requirements

This extension is for Visual Studio Code (VS Code) editor and highlights the code using the 
language rules and snippet completion described by the TDL BNF.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

None at this time.

## Release Notes

New Release. Version 0.8.0

### 0.7.0

Initial release for eternal use.

### 1.0.1

No Fixed issues.

### 1.1.0

No new features.

## Working with Markdown

# Deploying TDL Extension
1. Packaging the Extension
    1. Open a terminal in your extension's root directory (i.e., the directory where the extension resides).
    2. Run the following command to create a `.vsix` file:
      * Using Bash
        ```
        vsce package
        ```
2. Optional Local Installation
      To test the extension before publishing, run:
      * Using Bash
        ```
        code --install-extension *.vsix
        ```
3. Optional Publishing to Marketplace
    1. Create a publisher account: Visit https://marketplace.visualstudio.com/manage
    2. Authenticate with vsce:
       * Using Bash
         ```
         vsce login
         ```
     3. Publish the extension:
        * Using Bash
          ```
          vsce publish
          ```
4. Manual Installation
    1. Share the `.vsix` file with users.
    2. Installation steps for users:
        * Open VS Code's Extensions view (`Ctrl+Shift+X`).
        * Execute the three dots (usually a single click) in the top right corner.
        * Select `Install from VSIX`.
        * Choose the `.vsix` file.

5. Additional Notes

    * Update `package.json`: Ensure the version field reflects the updated version.
    * Review guidelines: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
    * Test thoroughly before publishing.
    * Gather feedback for continuous improvement.
