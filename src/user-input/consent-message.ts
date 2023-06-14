import readline from "readline";

export const consentMessage = async (message: string) => {
  const rl = readline.createInterface({
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
