import Mixpanel from "mixpanel";
import { version } from "../../package.json";
import type { Configuration, Metrics, MixpanelMetrics } from "../types";
import { getProjectHashName } from "./get-project-hash-name";
import { commandLineArgs } from "..";

const token = "71779acbc0b88b6430a725a9e4e22780";

const mixpanelClient = Mixpanel.init(token);

export const sendMetadataToMixpanel = async (
  event: string,
  metrics: Metrics,
  config: Configuration
): Promise<void> => {
  const data: MixpanelMetrics = createMixpanelMetrics(metrics, config);

  return new Promise<void>((resolve, reject) => {
    mixpanelClient.track(event, data, (err?: Error | null) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const createMixpanelMetrics = (
  metrics: Metrics,
  config: Configuration
): MixpanelMetrics => {
  return {
    ...metrics,
    isPipeline: commandLineArgs.pipeline,
    filterUsed: isFilterUsed(config),
    thresholdUsed: config.errorThresholdMB,
    appVersion: version,
    projectHashName: getProjectHashName()
  };
};

const isFilterUsed = (config: Configuration): boolean =>
  config.filterByName !== "" ||
  config.ignorePattern !== "" ||
  config.showOnlyErrors;
