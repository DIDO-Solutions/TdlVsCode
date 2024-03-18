/**
 * File: extension.js
 * 
 * Copyright (c) 2024 by Dido Solutions. All rights reserved.
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
 *   Dido Solutions' consent (https://didosolutions.com/contact/).
 *
 * **Attribution Notice:**
 *
 * * You must retain this attribution notice in all copies of the file:
 * * Copyright (c) 2023 by Dido Solutions. All rights reserved.
 */

/**
 * The following is an overview of the extension.js file.
 * * Imports: The file starts with imports of necessary modules such as vscode, fs, and path.
 * * Constants: It defines three constants LOGGING_PROGRESS, LOGGING_INFO, and LOGGING_ERRORS, which control logging behavior for progress messages, informational messages, and error messages, respectively.
 * * Functions:
 * ** activate: This function is the entry point of the extension. It initializes the extension, reads and merges workspace files, and provides logging feedback to the user.
 * ** readWorkspaceContentFromFile: Reads workspace content from a file and returns an array of textMateRules.
 * ** getTextMateRules: Retrieves textMateRules from the provided workspace configuration.
 * ** mergeTextMateRules: Merges textMateRules from templateDLTextMateRules with localTextMateRules and updates the local workspace file.
 * ** isEqualRule: Checks if two textMateRules are equal based on the value of their scope.
 * ** updateLocalWorkspaceFile: Updates the local workspace file with the provided textMateRules.
 * ** logProgress, logInfo, logError: Logging functions to output progress messages, informational messages, and error messages, respectively.
 * Exports: The activate function is exported as the main function of the module.
 * Comments: Each function is documented using JSDoc comments to describe its purpose, parameters, and return values.
 * File Header: The file contains a comprehensive file header that includes copyright information, license terms, prohibited activities, and attribution notice.
 * 
 * The high-level logic is:
 * The steps used in the activate function to copy the templateDL.code-workspace textMateRules to the local workspace.code-workspace file:
 * 1. Check if the Current File is Part of a Workspace:
 *    - The function starts by checking if the current file is part of a workspace. This is done using vscode.workspace.workspaceFile.
 * 2. Read textMateRules from the templateDL.code-workspace File:
 *    - If the current file is part of a workspace, the function constructs the path to the templateDL.code-workspace file using path.join and context.extensionPath.
 *    - It then reads the contents of the templateDL.code-workspace file using the readWorkspaceContentFromFile function.
 * 3.Read textMateRules from the Local Workspace File:
 *    - After reading textMateRules from the template workspace file, the function reads the textMateRules from the local workspace file using vscode.workspace. workspaceFile.fsPath.
 * 4. Merge textMateRules:
 *    - If the filenames of the template workspace file and the local workspace file are different, it merges the textMateRules.
 *    - This merging process involves comparing textMateRules from both files and adding any new rules from the template workspace to the local workspace.
 * 5. Update Local Workspace File:
 *    - After merging textMateRules, the function updates the local workspace file with the merged textMateRules using the updateLocalWorkspaceFile function.
 * 6. Logging Feedback:
 *    - Throughout these steps, the function logs progress messages to provide feedback to the user about the activation process.
 * 7. Completion:
 *    - Finally, the function completes the activation process.
 */

//===== Imports
const vscode      = require( 'vscode' );
const fileSystem  = require( 'fs' );
const path        = require( 'path' );

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
function activate ( context ) 
{ logProgress ( 'Starting the templateDL extension activation.');
  // Check if the current file is part of a workspace
  if ( vscode.workspace.workspaceFile ) 
  { // Read textMateRules from templateDL.code-workspace file
    const templateDLWorkspaceFilePath 
      = path.join(context.extensionPath, 'templateDL.code-workspace' );
    logProgress ( 'The templateDLWorkspaceFilePath is: ', 
                  templateDLWorkspaceFilePath 
                );
    const templateDLTextMateRules 
      = readWorkspaceContentFromFile ( templateDLWorkspaceFilePath );
    // Read textMateRules from local workspace file
    logProgress ( 'The read the templateDLTextMateRules are: ', 
                  JSON.stringify ( templateDLTextMateRules ) 
                );
    const localWorkspaceFilePath 
      = vscode.workspace.workspaceFile.fsPath;
    const templateDLFilename = path.basename ( templateDLWorkspaceFilePath );
    logProgress ( 'The templateDL filename is: ' + templateDLFilename );
    const localFilename      = path.basename ( localWorkspaceFilePath );
    logProgress ( 'The local filename is: ' + localFilename );
    if ( templateDLFilename !== localFilename )
    { const localTextMateRules 
        = readWorkspaceContentFromFile ( localWorkspaceFilePath) ;
      // Merge textMateRules
      if ( templateDLTextMateRules.length > 0)
      { mergeTextMateRules 
          ( templateDLTextMateRules, 
            localTextMateRules, 
            localWorkspaceFilePath 
          );
      } // End if
    } // end if
    logProgress ( 'Finishing the templateDL extension activation.');
  } // End if
  else 
  { logInfo ( 'The current file is not part of a workspace.');
  } // end else
} // end function activate

//----- readWorkspaceContentFromFile
/**
 * Reads workspace content from a file.
 * 
 * @param {string} filePath - The path to the file to read.
 * @returns {Array} An array of textMateRules read from the file.
 */
function readWorkspaceContentFromFile ( filePath )
{ logProgress ( 'Starting to readWorkspaceContentFromFile: ' 
                 + filePath 
              );
  let textMateRules = [];
  try 
  { const content
     = fileSystem.readFileSync ( filePath, 'utf8' );
    const linesOfCode = content.split(/\r?\n/).length;
    logProgress ( 'lines Of Code read are: ' + linesOfCode );
    const workspaceConfig 
      = JSON.parse ( content );
    logProgress ( 'The contents of the workspaceConfig are: ' 
                  + JSON.stringify ( workspaceConfig ) 
                );
    textMateRules = getTextMateRules ( workspaceConfig );
    logProgress ( 'Finishing loading textMateRules: ' 
                  + JSON.stringify ( textMateRules ) 
                );
  } // End try
  catch ( error ) 
  { logError ( 'Error reading textMateRules from file:', error);
  } // End catch
  return textMateRules;
} // End function function readWorkspaceContentFromFile

//----- getTextMateRules
/**
 * Retrieves textMateRules from the provided workspace configuration.
 * 
 * @param {Object} workspaceConfig - The workspace configuration object.
 * @returns {Array} An array of textMateRules extracted from the workspace configuration.
 */
function getTextMateRules ( workspaceConfig ) 
{ logProgress ( 'Starting to get the texMateRules' );
  let textMateRules = [];
  // Check if tokenColorCustomizations is defined
  const tokenColorCustomizations = workspaceConfig?.settings?.['editor.tokenColorCustomizations'];
  const rules                    = tokenColorCustomizations?.['[*]']?.textMateRules;
  const editorTextMateRules      = workspaceConfig?.settings?.editor?.textMateRules;
  if ( rules ) 
  { Object.keys ( rules ).forEach
      ( key => 
          { const rule = rules [ key ];
            logProgress ( 'Adding new templateDL rule: ' + JSON.stringify ( rule ) );
            textMateRules.push ( rule );
          } // End key
      );
  } // End if
  // Check if textMateRules is defined directly under editor
  else if ( editorTextMateRules ) 
  { textMateRules = textMateRules.concat ( editorTextMateRules );
  } // End else if
  logProgress ( 'Finishing getting the textNateRules' );
  return textMateRules;
} // End function getTextMateRules

//----- mergeTextMateRules
/**
 * Merges textMateRules from templateDLTextMateRules with localTextMateRules and updates the local workspace file.
 * 
 * @param {Array} templateDLTextMateRules - An array of textMateRules from the templateDL workspace.
 * @param {Array} localTextMateRules - An array of textMateRules from the local workspace.
 * @param {string} localWorkspaceFilePath - The file path of the local workspace.
 */
function mergeTextMateRules
  ( templateDLTextMateRules, localTextMateRules, localWorkspaceFilePath ) 
{ logProgress ( 'Starting to mergeTextMateRules' );
  const mergedTextMateRules = [...localTextMateRules];
  // Check if each rule from templateDLTextMateRules exists in localTextMateRules
  for ( const rule of templateDLTextMateRules ) 
  { if ( !localTextMateRules.some
      ( existingRule => isEqualRule ( existingRule, rule ) ) ) 
    { // Add rule to mergedTextMateRules if it doesn't exist
      logInfo ( 'Adding textMateScope: ', rule.scope );
      mergedTextMateRules.push( rule );
    } // End if
  } // End for rule
  // Update local workspace file with merged textMateRules
  updateLocalWorkspaceFile 
    ( mergedTextMateRules, 
      localWorkspaceFilePath
    );
  logProgress('Finishing mergeTextMateRules ');
} // End function mergeTextMateRules

//----- isEqualRule
/**
 * Checks if two textMateRules are equal based on the value of their scope.
 * 
 * @param {Object} rule1 - The first textMateRule object.
 * @param {Object} rule2 - The second textMateRule object.
 * @returns {boolean} Returns true if the scopes of the two rules are equal, otherwise false.
 */
function isEqualRule 
  ( rule1, 
    rule2 
  ) 
{ const localResult = rule1["scope"] === rule2["scope"];
  return localResult;
} // End function isEqualRule

//----- updateLocalWorkspaceFile
/**
 * Updates the local workspace file with the provided textMateRules.
 * 
 * @param {Object[]} textMateRules - An array of textMateRule objects to be updated in the workspace file.
 * @param {string} localWorkspaceFilePath - The file path of the local workspace file to be updated.
 */
function updateLocalWorkspaceFile
  ( textMateRules, 
    localWorkspaceFilePath
  ) 
{ logProgress ( 'Starting to updateLocalWorkspaceFile: '
                + localWorkspaceFilePath
              );
  try 
  { const content            = fileSystem.readFileSync 
                               ( localWorkspaceFilePath, 
                                 'utf8' 
                               );
    const workspaceConfig    = JSON.parse(content);
    workspaceConfig.settings = workspaceConfig.settings 
                               || {};
    workspaceConfig.settings.editor.tokenColorCustomizations 
                             = workspaceConfig.settings.editor.tokenColorCustomizations 
                               || {};
    workspaceConfig.settings.editor.tokenColorCustomizations["[*]"] 
                             = { textMateRules: textMateRules };
    fileSystem.writeFileSync
      ( localWorkspaceFilePath, 
        JSON.stringify ( workspaceConfig, 
                         null, 
                         2
                       ), 
        'utf8'
      );
  }  // End try
  catch ( error ) 
  { logError ( 'Error updating local workspace file:', error );
  } // End catch
  logProgress ( 'Finishing the updateLocalWorkspaceFile' );
} // End function updateLocalWorkspaceFile

//----- logProgress
/**
 * Logs progress messages to the console if logging for progress is enabled.
 * 
 * @param {string} text - The text message to log.
 */
function logProgress ( text )
{ if ( LOGGING_PROGRESS ) 
  { console.log ( '--   ' + text );
  } // End if 
} // End function logProgress

//----- logInfo
/**
 * Logs information if logging for info is enabled.
 * 
 * @param {string} text - The information text to log.
 */
function logInfo ( text )
{ if ( LOGGING_INFO ) 
  { console.log ( '--++ ' + text );
  } // End if 
} // End function logInfo

//----- logError
/**
 * Logs an error message if logging for errors is enabled.
 * 
 * @param {string} text - The error message to log.
 */
function logError ( text )
{ if ( LOGGING_ERRORS ) 
  { console.log ( '--** ' + text );
  } // End if 
} // End function logError

//===== Exports
/**
 * This exporting a single function named activate from the module. This means that when another module imports this module using require, it can access the activate function and use it.
 *
 */
module.exports = { activate };
