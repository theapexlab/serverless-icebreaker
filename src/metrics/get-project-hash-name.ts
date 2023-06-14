import { projectRoot } from "..";
import crypto from "crypto";
import path from "path";

export const getProjectHashName = () => {
  const projectFolderName = path.basename(projectRoot);
  return crypto.createHash("md5").update(projectFolderName).digest("hex");
};
