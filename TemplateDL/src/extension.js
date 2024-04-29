/**
 * File: extension.js
 * 
 * Copyright  ( c ) 2024 by Dido Solutions. All rights reserved.
 *
 * **Prohibited Activities:**
 *
 * * You cannot copy, modify, distribute, transmit, reproduce, publish,
 * * publicly display, publicly perform, create derivative works, transfer,
 *   or sell any of the content without prior written permission from 
 *   Dido Solutions.
 *
 * **Non-Exclusive License:**
 *
 * * This file is provided "as is" without warranty of any kind, expressed or 
 *   implied.
 * * You are granted a non-exclusive, non-transferable license to use this
 *   file for personal, non-commercial purposes only.
 *
 * **Non-Commercial Use:**
 *
 * * Governments, educational institutions, and tax-exempt/public-benefit 
 *   non-profits are granted a non-exclusive, non-transferable license to 
 *   use this file for non-commercial purposes.
 *
 * **Commercial Use:**
 *
 * * You cannot use this file for your business or profit without 
 *   Dido Solutions' consent  ( https://didosolutions.com/contact/ ).
 *
 * **Attribution Notice:**
 *
 * * You must retain this attribution notice in all copies of the file:
 * * Copyright  ( c ) 2023 by Dido Solutions. All rights reserved.
 */

/**
 * File: extension.js
 * 
 * This file serves as the main script for the TemplateDL extension. It provides functionality for setting up the extension, including executing a setup script, checking and updating workspace configurations, and handling activation and deactivation of the extension.
 * 
 * The extension activation process involves several steps:
 * 1. Initialization: The extension initializes by checking whether the setup process has already been completed.
 * 2. Setup Check: If setup is not completed, the extension proceeds with the setup process.
 * 3. Workspace Configuration: The extension checks the existing workspace configuration to determine whether it contains the necessary settings. If not, it executes a setup script to update the configuration.
 * 4. Reload Workspace: After completing the setup process successfully, the extension reloads the workspace to apply the updated configuration.
 * 
 * The extension deactivation process involves a single step:
 * 1. Logging: The extension logs a message indicating that it has been deactivated.
 * 
 * @see {@link https://didosolutions.com/contact/} For any inquiries or support related to the TemplateDL extension, please contact Dido Solutions.
 * 
 * @copyright 2024 by Dido Solutions. All rights reserved.
 * 
 * @license This file is provided "as is" without warranty of any kind, expressed or implied. You are granted a non-exclusive, non-transferable license to use this file for personal, non-commercial purposes only.
 * 
 * @exports {activate} - The activate function initializes the extension and handles the activation process.
 * @exports {deactivate} - The deactivate function handles the deactivation process of the extension.
 */

//===== Imports
const vscode        = require ( 'vscode' );
const { execSync }  = require ( 'child_process' );
const path          = require ( 'path' );
const fs            = require ( 'fs' );

//===== Constants
/**
 * Indicates whether logging for progress messages is enabled.
 * Modify this constant to control logging behavior. true=ON
 */
const LOGGING_PROGRESS = true;
/**
 * Indicates whether logging for informational messages is enabled.
 * Modify this constant to control logging behavior. true=ON
 */
const LOGGING_INFO     = true;
/**
 * Indicates whether logging for error messages is enabled.
 * Modify this constant to control logging behavior. true=ON
 */
const LOGGING_ERRORS   = true;

//===== Global Variables
/**
 * Indicates whether the setup process for the TemplateDL extension has been completed.
 * 
 * This flag is used to track whether the setup process, which includes tasks such as
 * creating or updating workspace files, has been completed. It is initially set to false
 * and is set to true once the setup process is successfully completed.
 * 
 * @type {boolean}
 */let setupCompleted     = false; // Flag to track whether setup has been completed

//===== Functions

//----- activate
/**
 * Activates the templateDL extension.
 * 
 * This function is responsible for initializing the extension templateDL, 
 * reading and merging workspace files, and providing logging feedback to the user.
 * 
 * @param {vscode.ExtensionContext} context The extension context provided by VS Code.
 */
async function activate ( context ) 
{ logProgress ( 'Starting to activate the TemplateDL extension' );
  if  ( !setupCompleted ) {
    const extensionPath = context.extensionPath;
    const templateDLWorkspaceFilePath = path.join ( extensionPath, 'templateDL.code-workspace' );
    try 
    { logInfo ( 'Starting TemplateDL setup...' );
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if  ( !workspaceFolders || workspaceFolders.length === 0 ) 
      { vscode.window.showErrorMessage ( 'No workspace folder found.' );
        logProgress ( 'Finishing activate the TemplateDL extension(1)' );
        return;
      } // End if workspaceFolders
      console.log ('###### ' );
      const workspaceUri = workspaceFolders[0].uri;
      logInfo ( 'Working folder: ' + workspaceUri );
      const localWorkSpacePath = vscode.Uri.joinPath ( workspaceUri, 'workspace.code-workspace' );
      const workspaceExists = await vscode.workspace.fs.stat ( localWorkSpacePath )
        .then (  (  ) => true )
        .catch (  (  ) => false );
      if  ( workspaceExists ) 
      { logInfo ( 'Reading existing file: ' + localWorkSpacePath.fsPath  );
        const workspaceContents = fs.readFileSync ( localWorkSpacePath.fsPath, 'utf-8' );
        const linesOfCode = workspaceContents.split(/\r?\n/).length;
        logInfo ( 'lines Of JSON read are: ' + linesOfCode );
        if  ( workspaceContents.includes ( 'templateDL' ) ) {
          logInfo ( 'Existing workspace.code-workspace file used(2)' );
          await vscode.workspace.updateWorkspaceFolders ( workspaceFolders.length, null, { uri: workspaceUri } );
          logProgress ( 'Finishing activate the TemplateDL extension' );
          return;
        } // End if includes
      } // End if workspaceExists
      const setupScript = path.join ( extensionPath, 'src', 'setupTemplateDL.sh' );
      const setupScriptCmd = `sh ${setupScript} ${templateDLWorkspaceFilePath} ${localWorkSpacePath.fsPath} 2>&1`;
      logInfo ( 'Setup script command:', setupScriptCmd );
      const output = execSync ( setupScriptCmd, { encoding: 'utf-8' } );
      logInfo ( 'Output:', output );
      logInfo ( 'Reloading the workspace...' );
      await vscode.commands.executeCommand ( 'vscode.openFolder', localWorkSpacePath, false );
    } // End try
    catch  ( error ) 
    { const errorMessage = error.output ? error.output : error.message;
      logError ( 'Output: ' + errorMessage );
      vscode.window.showErrorMessage ( `Error setting up TemplateDL: ${errorMessage}` );
    } // End catch
    logProgress ( 'Finishing to activate the TemplateDL extension(3)' );
    const document = await vscode.workspace.openTextDocument ( vscode.Uri.file ( extensionPath ) );
    await vscode.window.showTextDocument ( document );
  } // End if setupCompleted
} // End function activate

/**
 * Deactivates the TemplateDL extension.
 * 
 * This function is called when the extension is deactivated or unloaded.
 * It logs a message indicating that the extension has been deactivated.
 */
function deactivate (  ) 
{ logProgress  (  'TemplateDL extension has been deactivated!' );
  setupCompleted = false; // Reset the setupCompleted flag
} // End function deactivate


//----- logProgress
/**
 * Logs progress messages to the console if logging for progress is enabled.
 * 
 * @param {string} text - The text message to log.
 */
function logProgress  (  text  )
{ if  (  LOGGING_PROGRESS  ) 
  { console.log  (  '---- ' + text  );
  } // End if 
} // End function logProgress

//----- logInfo
/**
 * Logs information if logging for info is enabled.
 * 
 * @param {string} text - The information text to log.
 */
function logInfo  (  text  )
{ if  (  LOGGING_INFO  ) 
  { console.log  (  '--++ ' + text  );
  } // End if 
} // End function logInfo

//----- logError
/**
 * Logs an error message if logging for errors is enabled.
 * 
 * @param {string} text - The error message to log.
 */
function logError  (  text  )
{ if  (  LOGGING_ERRORS  ) 
  { console.log  (  '--** ' + text  );
    console.error  (  '--** ' + text  );
  } // End if 
} // End function logError

//===== Exports
/**
 * This exporting a single function named activate from the module. This means that when another module imports this module using require, it can access the activate function and use it.
 *
 */
module.exports = 
{ activate,
  deactivate
};