import { writeFileSync } from "fs";
import { DateTime } from "luxon";

const timeStamp = DateTime.now().toFormat("dd.MM.yy. HH:mm");

export const createReport = (output: string[]) => {
  const reportDate = `🗓️ Date issued: ${timeStamp}\n`;
  output.push(reportDate);
  writeFileSync(`sib-report.txt`, output.reverse().join("\n"));
};
