/**
 * extension.js defines the basic structure of a simple extension 
 * that registers a command to show an information message when 
 * invoked. The activate function is where you would typically 
 * set up listeners, register additional commands, and perform 
 * any necessary initialization for your extension. 
 * The deactivate function is where you would handle cleanup 
 * tasks if needed.
 */

//===== Imports
//imports the vscode module, which provides the API for interacting 
// with Visual Studio Code. The * as vscode syntax imports all the 
// exports from the vscode module and makes them available through 
// the vscode namespace.
import * as vscode from 'vscode';

//===== Functions
/**
 * The activate function is called when the extension is activated. 
 * It typically contains the initialization and setup logic for your 
 * extension.
 */
function activate ( context ) 
{ console.log('-- Congratulations, your extension is now active!');
  // Registers a command named extension.sayHello. 
  // When this command is executed, it shows an information message 
  // with the content 'Hello World!'. Commands are often associated 
  // with user interface elements, like buttons or menu items.
  let disposable 
        = vscode.commands.registerCommand
          ( 'extension.sayHello', () => 
            { vscode.window.showInformationMessage('TDL Extension says Hello World!');
            }
          );
  // Adds the disposable created above to the context's subscriptions. 
  // This ensures that resources are properly disposed of when the 
  // extension is deactivated.
  context.subscriptions.push(disposable);
} // End function activate

/**
 * The deactivate function is called when the extension is deactivated. 
 * It should contain any cleanup logic necessary before the extension 
 * is shut down.
 */
function deactivate() 
{
} // End function deactivate

/**
 * This exports the activate and deactivate functions so that 
 * they can be accessed by Visual Studio Code when loading the 
 * extension.
 */
module.exports 
         = { activate,
             deactivate
           };
