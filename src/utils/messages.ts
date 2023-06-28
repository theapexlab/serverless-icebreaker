export enum Messages {
  PATH_ERROR = "No lambdas found, please run a build first or check your buildPath",
  CONFIG_CREATED = 'A configuration file has been created in the project root as "sib-config.json". You can modify it at any time or use "sib --init" to reconfigure.\nPress any key to continue...',
  ERROR_THRESHOLD_EXCEEDED = "Cold Start Tool WARNING: threshold set in sib-config.json is exceeded by the following lambdas:",
  COMPRESSED_FILE_FOUND = "Compressed files found, decompressing..."
}
