import { getDefaultConfig } from '@expo/metro-config';


const defaultConfig = getDefaultConfig(__dirname);

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- okay
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
