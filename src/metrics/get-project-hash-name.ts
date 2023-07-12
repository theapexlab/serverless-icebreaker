import { projectRoot } from "..";
import { createHash } from "crypto";
import { basename as pathBasename } from "path";

export const getProjectHashName = () => {
  const projectFolderName = pathBasename(projectRoot);
  return createHash("md5").update(projectFolderName).digest("hex");
};
