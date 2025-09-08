#!/bin/bash

# ----------------------
# KUDU Deployment Script
# Version: 1.0.17
# ----------------------

# Helpers
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
    exit 1
  fi
}

# Setup
# -----

SCRIPT_DIR="${BASH_SOURCE[0]%\\*}"
SCRIPT_DIR="${SCRIPT_DIR%/*}"
ARTIFACTS=$SCRIPT_DIR/../artifacts
KUDU_SYNC_CMD=${KUDU_SYNC_CMD//\"}

if [[ ! -n "$DEPLOYMENT_SOURCE" ]]; then
  DEPLOYMENT_SOURCE=$SCRIPT_DIR
fi

if [[ ! -n "$NEXT_MANIFEST_PATH" ]]; then
  NEXT_MANIFEST_PATH=$ARTIFACTS/manifest

  if [[ ! -n "$PREVIOUS_MANIFEST_PATH" ]]; then
    PREVIOUS_MANIFEST_PATH=$NEXT_MANIFEST_PATH
  fi
fi

if [[ ! -n "$DEPLOYMENT_TARGET" ]]; then
  DEPLOYMENT_TARGET=$ARTIFACTS/wwwroot
else
  KUDU_SERVICE=true
fi

if [[ ! -n "$KUDU_SYNC_CMD" ]]; then
  # Install kudu sync
  echo Installing Kudu Sync
  npm install kudusync -g --silent
  exitWithMessageOnError "npm failed"

  if [[ ! -n "$KUDU_SERVICE" ]]; then
    # In case we are running locally this is the correct location of kuduSync
    KUDU_SYNC_CMD=kuduSync
  else
    # In case we are running on kudu service this is the correct location of kuduSync
    KUDU_SYNC_CMD=$APPDATA/npm/node_modules/kuduSync/bin/kuduSync
  fi
fi

# Install pnpm
if [ ! -e "$DEPLOYMENT_SOURCE/node_modules/.bin/pnpm" ]; then
  echo "Installing pnpm"
  npm install -g pnpm@10.15.0
  exitWithMessageOnError "npm failed to install pnpm"
fi

##################################################################################################################################
# Deployment
# ----------

echo Handling node.js deployment.

# 1. Install pnpm packages
if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then
  cd "$DEPLOYMENT_SOURCE"
  
  echo "Creating script to fix workspace references"
  cat > fix-workspace-refs.js << 'EOF'
  const fs = require('fs');
  const path = require('path');

  function processPackageJson(filePath) {
    console.log(`Processing: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    try {
      const pkg = JSON.parse(content);
      let modified = false;

      // Check and replace in dependencies
      if (pkg.dependencies) {
        Object.keys(pkg.dependencies).forEach(dep => {
          if (pkg.dependencies[dep].startsWith('workspace:')) {
            pkg.dependencies[dep] = '*';
            modified = true;
          }
        });
      }

      // Check and replace in devDependencies
      if (pkg.devDependencies) {
        Object.keys(pkg.devDependencies).forEach(dep => {
          if (pkg.devDependencies[dep].startsWith('workspace:')) {
            pkg.devDependencies[dep] = '*';
            modified = true;
          }
        });
      }

      // Save if modified
      if (modified) {
        fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2));
        console.log(`Updated: ${filePath}`);
      }
    } catch (e) {
      console.error(`Error processing ${filePath}:`, e);
    }
  }

  function findAndProcessPackageFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules
        if (entry.name !== 'node_modules') {
          findAndProcessPackageFiles(fullPath);
        }
      } else if (entry.name === 'package.json') {
        processPackageJson(fullPath);
      }
    }
  }

  // Start processing from the root directory
  findAndProcessPackageFiles('.');
  EOF
  
  echo "Fixing workspace references"
  node fix-workspace-refs.js
  
  echo "Installing pnpm packages without frozen lockfile"
  pnpm install --no-frozen-lockfile
  exitWithMessageOnError "pnpm install failed"
  
  echo "Building the application"
  pnpm run build
  exitWithMessageOnError "pnpm build failed"
  
  cd - > /dev/null
fi

# 2. KuduSync
if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then
  "$KUDU_SYNC_CMD" -v 50 -f "$DEPLOYMENT_SOURCE" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" -i ".git;.hg;.deployment;deploy.sh;node_modules"
  exitWithMessageOnError "Kudu Sync failed"
fi

##################################################################################################################################
echo "Finished successfully."
