import Mixpanel from "mixpanel";
import { version } from "../../package.json";
import type { Configuration, Metrics, MixpanelMetrics } from "../types";

const token = "71779acbc0b88b6430a725a9e4e22780";

const mixpanelClient = Mixpanel.init(token);

export const sendMetadataToMixpanel = (
  event: string,
  metrics: Metrics,
  config: Configuration
) => {
  const data: MixpanelMetrics = createMixpanelMetrics(metrics, config);
  mixpanelClient.track(event, data);
};

const createMixpanelMetrics = (
  metrics: Metrics,
  config: Configuration
): MixpanelMetrics => {
  return {
    ...metrics,
    filterUsed: isFilterUsed(config),
    thresholdUsed: config.errorThresholdMB,
    appVersion: version
  };
};

const isFilterUsed = (config: Configuration): boolean =>
  config.filterByName !== "" ||
  config.ignorePattern !== "" ||
  config.showOnlyErrors;
