export const getPercentageString = (value: number, sumOfModuleFunctions: number) =>
  ((value / sumOfModuleFunctions) * 100).toFixed(2) + "%";
