import { createInterface } from "readline";

export const consentMessage = async (message: string) => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise<void>(resolve => {
    rl.question(message, () => {
      resolve();
    });
  });

  rl.close();
};
