// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Watchman handles file watching more efficiently than Node's FSEvent
// This prevents EMFILE errors on macOS
config.watchFolders = [__dirname];

module.exports = config;

