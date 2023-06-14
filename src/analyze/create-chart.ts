import { byteToMegabyte } from "../utils/byte-to-megabyte";
import { warningThresholdMB } from "../utils/get-warning-threshold";
import { Chart } from "cli-chart";

export const createChart = (data: number[], errorThreshold: number) => {
  const width = data.length * 2;
  const height = byteToMegabyte(Math.max(...data)) / 2;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const chart = new Chart({
    ylabel: "lambda \nsize (MB)",
    direction: "y",
    lmargin: 10,
    step: 2,
    height,
    width
  });

  data.forEach(size => {
    const warningThreshold = warningThresholdMB(errorThreshold);
    const sizeInMegabyte = byteToMegabyte(size);

    const color =
      sizeInMegabyte > errorThreshold
        ? "red"
        : sizeInMegabyte > warningThreshold
        ? "yellow"
        : "green";

    const displaySize = sizeInMegabyte > 1 ? sizeInMegabyte : 1;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    chart.addBar(displaySize, color);
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  chart.draw();
  process.exit(0);
};
