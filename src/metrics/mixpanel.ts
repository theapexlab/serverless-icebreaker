import Mixpanel from "mixpanel";
import { Metrics, MixpanelMetrics } from "../types";
import { config } from "../..";
import { version } from "../../package.json";

const token = "71779acbc0b88b6430a725a9e4e22780";

const mixpanelClient = Mixpanel.init(token);

export const sendMetadataToMixpanel = (event: string, metrics: Metrics) => {
  const data: MixpanelMetrics = createMixpanelMetrics(metrics);
  mixpanelClient.track(event, data);
};

const createMixpanelMetrics = (metrics: Metrics): MixpanelMetrics => {
  return {
    ...metrics,
    filterUsed: config.filterByName !== "" || config.showOnlyErrors,
    thresholdUsed: config.warningThresholdMB,
    appVersion: version,
  };
};
