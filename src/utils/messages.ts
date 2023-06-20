export enum Messages {
  PATH_ERROR = "No lambdas found, please run a build first or check your buildPath",
  CONFIG_CREATED = 'A configuration file has been created in the project root as "cst-config.json". You can modify it at any time or use "cst --init" to reconfigure.\nPress any key to continue...',
  ERROR_THRESHOLD_EXCEEDED = "Cold Start Tool WARNING: threshold set in cst-config.json is exceeded by the following lambdas:"
}
