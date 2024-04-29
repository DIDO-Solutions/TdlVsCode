#!/bin/bash

################################################################################
# File: setupTemplateDL.sh
#
# Description:
# This script sets up the TemplateDL extension by modifying the local 
# workspace configuration file with the necessary settings and configurations 
# from the template workspace file.
#
# Usage:
# ./setupTemplateDL.sh [templateWorkspaceFile] [localWorkSpaceFile]
#
# Arguments:
#   templateWorkspaceFile: (optional) Path to the templateDL.code-workspace JSON file.
#   localWorkSpaceFile: (optional) Path to the local workspace.code-workspace JSON file.
#
# If no arguments are provided, the script will use default files:
#   Default templateWorkspaceFile: ~/.vscode/extensions/didosolutions.template-definition-language-*/templateDL.code-workspace
#   Default localWorkSpaceFile: ./workspace.code-workspace
#
# Author: R. W. "Nick" Stavros
# Date: 9 Apr 2024
# Version: 0.9.0
#
# Copyright (c) 2024 by Dido Solutions. All rights reserved.
#
# **Prohibited Activities:**
# * You cannot copy, modify, distribute, transmit, reproduce, publish,
#   publicly display, publicly perform, create derivative works, transfer,
#   or sell any of the content without prior written permission from 
#   Dido Solutions.
#
# **Non-Exclusive License:**
# * This file is provided "as is" without warranty of any kind, expressed or 
#   implied.
# * You are granted a non-exclusive, non-transferable license to use this
#   file for personal, non-commercial purposes only.
#
# **Non-Commercial Use:**
# * Governments, educational institutions, and tax-exempt/public-benefit 
#   non-profits are granted a non-exclusive, non-transferable license to 
#   use this file for non-commercial purposes.
#
# **Commercial Use:**
# * You cannot use this file for your business or profit without 
#   Dido Solutions' consent (https://didosolutions.com/contact/).
#
# **Attribution Notice:**
# * You must retain this attribution notice in all copies of the file:
# * Copyright (c) 2023 by Dido Solutions. All rights reserved.
################################################################################

# Function to display usage information
function display_usage 
{ 
  echo "Usage: $0 [templateWorkspaceFile] [localWorkSpaceFile]"
  echo "  templateWorkspaceFile: (optional) Path to the templateDL.code-workspace JSON File"
  echo "  localWorkSpaceFile: (optional) Path to the local workspace.code-workspace JSON File"
  echo
  echo "If no arguments are provided, the script will use default Files:"
  echo "  Default templateWorkspaceFile: ~/.vscode/extensions/didosolutions.template-definition-language-*/templateDL.code-workspace"
  echo "  Default localWorkSpaceFile: ./workspace.code-workspace"
}

# Check if help flag is provided
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
  display_usage
  exit 0
fi

echo "----- Starting :" $(basename "$0")
# Get the directory where the script resides
script_dir=$(dirname "${BASH_SOURCE[0]}")

# Determine the directory separator based on the operating system
if [[ "$OSTYPE" == "darwin"* || "$OSTYPE" == "linux-gnu"* ]]; then
    separator="/"
    echo "----- Unix Based OS"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    separator="\\"
    echo "----- Windows Based OS"
else
    echo "--+++ $OSTYPE is an Unsupported operating system."
    exit 1
fi

# Use the determined directory separator to construct file paths
templateWorkspaceFile="${1:-$HOME/.vscode/extensions/didosolutions.template-definition-language-0.9.0/templateDL.code-workspace}"
localWorkSpaceFile="${2:-$script_dir/workspace.code-workspace}"

# Replace "/" with the determined directory separator
templateWorkspaceFile="${templateWorkspaceFile//\//$separator}"
localWorkSpaceFile="${localWorkSpaceFile//\//$separator}"

echo "--    Default templateWorkspaceFile: $templateWorkspaceFile"
templateWorkspaceFile="${1:-$HOME/.vscode/extensions/didosolutions.template-definition-language-0.9.0/templateDL.code-workspace}"
echo "--    Updated templateWorkspaceFile: $templateWorkspaceFile"
echo "--    Default localWorkSpaceFile: $localWorkSpaceFile"

# Check if localWorkSpaceFile exists
if [ -f "$localWorkSpaceFile" ]; then
  echo "--    1) Workspace File $localWorkSpaceFile exists."
  # Check if localWorkSpaceFile contains scopes with "templateDL"
  if grep -q '"scope": ".*templateDL.*"' "$localWorkSpaceFile"; then
    echo "--    2) Workspace File $localWorkSpaceFile already contains scopes with 'templateDL'. No changes needed." 
    exit 0
  else
    echo "--    3) Workspace File $localWorkSpaceFile does not contain scopes with 'templateDL'. Making modifications..."
    # Proceed with making modifications
    # Check if localWorkSpaceFile contains settings section
    if grep -q '"settings": {' "$localWorkSpaceFile"; then
      echo "--    2) Workspace File $localWorkSpaceFile already contains settings section." 
      # Check if localWorkSpaceFile contains "editor.tokenColorCustomizations"
      if grep -q '"editor.tokenColorCustomizations": {' "$localWorkSpaceFile"; then
        echo "--    3) Workspace File $localWorkSpaceFile contains 'editor.tokenColorCustomizations' section."
      else
        echo "--    4) Workspace File $localWorkSpaceFile does not contain 'editor.tokenColorCustomizations' section."
        # Add the 'editor.tokenColorCustomizations' section from templateWorkspaceFile to localWorkSpaceFile
        sed -i '' '/"settings": {/a\
  "editor.tokenColorCustomizations": {\
    "[*]": {\
      "textMateRules": []\
    }\
  }\
' "$localWorkSpaceFile"
      exit_code=$?
        if [ $exit_code -eq 0 ]; then
          echo "--    5) 'editor.tokenColorCustomizations' section added to $localWorkSpaceFile."
        else
          echo "--*** 6) Error adding 'editor.tokenColorCustomizations' section to $localWorkSpaceFile. Return code: $exit_code. Aborting."
          exit $exit_code
        fi
      fi
      # Check if localWorkSpaceFile contains "[*]" or "[TemplateDL]" section
      if grep -q '"[*]"' "$localWorkSpaceFile" || grep -q '"[TemplateDL]"' "$localWorkSpaceFile"; then
        echo "--    10) Workspace File $localWorkSpaceFile contains '[*]' or '[TemplateDL]' section."
      else
        echo "--    11) Workspace File $localWorkSpaceFile does not contain '[*]' or '[TemplateDL]' section."
        # Add the '[*]' or '[TemplateDL]' section from templateWorkspaceFile to localWorkSpaceFile
        awk '/{/{print} /"folders": \[/{print "  \"[*]\": {}"} {print}' "$templateWorkspaceFile" > "$(dirname "$localWorkSpaceFile")/temp.json" && mv "$(dirname   "$localWorkSpaceFile")/temp.json" "$localWorkSpaceFile"
        exit_code=$?
        if [ $exit_code -eq 0 ]; then
          echo "--    12) '[*]' or '[TemplateDL]' section added to $localWorkSpaceFile."
        else
          echo "--*** 13) Error adding '[*]' or '[TemplateDL]' section to $localWorkSpaceFile. Return code: $exit_code. Aborting."
          exit $exit_code
        fi
      fi
      # Check if localWorkSpaceFile contains "textMateRules" section
      if grep -q '"textMateRules": {' "$localWorkSpaceFile"; then
        echo "--    14) Workspace File $localWorkSpaceFile contains 'textMateRules' section."
        # Check if localWorkSpaceFile contains "source.templateDL constant.language"
        if grep -q '"source.templateDL constant.language"' "$localWorkSpaceFile"; then
          echo "--    15) Workspace File $localWorkSpaceFile already contains 'source.templateDL constant.language' pattern in 'textMateRules' section. Skipping   textMateRules update."
        else
          echo "--    16) Workspace File $localWorkSpaceFile does not contain 'source.templateDL constant.language' pattern in 'textMateRules' section."
          # Append the "textMateRules" section from templateWorkspaceFile to localWorkSpaceFile
          awk '!x{x=sub(/}$/,",")} 1' "$templateWorkspaceFile" > "$localWorkSpaceFile.temp" && mv "$localWorkSpaceFile.temp" "$localWorkSpaceFile"
          exit_code=$?
          if [ $exit_code -eq 0 ]; then
            echo "--    17) 'textMateRules' section appended to $localWorkSpaceFile."
          else
            echo "--*** 18) Error appending 'textMateRules' section to $localWorkSpaceFile. Return code: $exit_code. Aborting."
            exit $exit_code
          fi
        fi
      else
        echo "--    19) Workspace File $localWorkSpaceFile does not contain 'textMateRules' section."
        # Add the 'textMateRules' section from templateWorkspaceFile to localWorkSpaceFile
        sed -i '' '/\"folders\": \[/s/}$/,\n  { \"path\": \".\" }\n  ]/' "$localWorkSpaceFile"
        # sed -i '' '/"folders": \[/{:a;N;/\]/!ba;s/}$/,\n  { "path": "." }\n  ]/}' "$localWorkSpaceFile"
        exit_code=$?
        if [ $exit_code -eq 0 ]; then
          echo "--    20) 'textMateRules' section added to $localWorkSpaceFile."
        else
          echo "--*** 21) Error adding 'textMateRules' section to $localWorkSpaceFile. Return code: $exit_code. Aborting."
          exit $exit_code
        fi
      fi
    fi
  fi
else
  echo "--    4) Workspace File $localWorkSpaceFile does not exist."
  # Proceed with creating the file and making modifications
  echo "--    25) Workspace File $localWorkSpaceFile does not exist."
  # Copy templateWorkspaceFile to localWorkSpaceFile
  echo "--    26) templateWorkspaceFile : $templateWorkspaceFile"
  echo "--    27) localWorkSpaceFile    : $localWorkSpaceFile"
  echo "--    28) cp \"$templateWorkspaceFile\" \"$localWorkSpaceFile\""
  cp "$templateWorkspaceFile" "$localWorkSpaceFile"
  exit_code=$?
  echo "--++++ 28.5 $exit_code"
  if [ $exit_code -eq 0 ]; then
    # Fix the format of the "folders" section
    sed -i '' 's/\"folders\"\s*:\s*\[[^\]]*\]/"folders": [ { "path": "." } ]/g' $localWorkSpaceFile
    echo "--+++ 29) Copied $templateWorkspaceFile to $localWorkSpaceFile."
  else
    echo "--*** 30) Error copying $templateWorkspaceFile to $localWorkSpaceFile. Return code: $exit_code. Aborting."
    exit $exit_code
  fi
fi
echo "----- Finishing :" $(basename "$0")
exit 0