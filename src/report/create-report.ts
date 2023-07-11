import fsAsync from "fs/promises";
import { DateTime } from "luxon";

const timeStamp = DateTime.now().toFormat("dd.MM.yy. HH:mm");

export const createReport = async (output: string[]) => {
  const reportDate = `🗓️ Date issued: ${timeStamp}\n`;
  output.push(reportDate);
  await fsAsync.writeFile(`sib-report.txt`, output.reverse().join("\n"));
};
