const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const fs = require('fs');

const blocksDir = path.resolve(__dirname, 'includes/blocks');
const entries = {};

fs.readdirSync(blocksDir).forEach(block => {
  const editPath = path.resolve(blocksDir, block, 'index.js');
  if (fs.existsSync(editPath)) {
    entries[block] = editPath;
  }
});

module.exports = {
  ...defaultConfig,
  entry: entries,
  output: {
    path: blocksDir,
    filename: '[name]/build/index.js'
  }
};