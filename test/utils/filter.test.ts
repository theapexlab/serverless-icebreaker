import {
  filterByNameExtensionAndIgnorePattern,
  filterByExtension,
  isNotContainsIgnorePattern
} from "../../src/utils/filter";

describe("filterByNameExtensionAndIgnorePattern", () => {
  it("should return true when all conditions are met", () => {
    const fileName = "exampleFile.js";
    const filterByName = "example";
    const ignorePattern = "ignore";

    expect(filterByNameExtensionAndIgnorePattern(fileName, filterByName, ignorePattern)).toBe(true);
  });

  it("should return false when any condition is not met", () => {
    const fileName = "exampleFile.html";
    const filterByName = "example";
    const ignorePattern = "ignore";

    // Expected result: false (fileName includes 'example', does not contain 'ignore', but has an invalid extension 'html')
    expect(filterByNameExtensionAndIgnorePattern(fileName, filterByName, ignorePattern)).toBe(false);
  });
});

describe("filterByExtension", () => {
  it("should return true when the file has a valid extension", () => {
    const fileName = "exampleFile.txt";
    const extensions = ["txt", "md", "json"];

    // Expected result: true (fileName has a valid extension 'txt')
    expect(filterByExtension(fileName, extensions)).toBe(true);
  });

  it("should return false when the file has an invalid extension", () => {
    const fileName = "exampleFile.html";
    const extensions = ["txt", "md", "json"];

    // Expected result: false (fileName has an invalid extension 'html')
    expect(filterByExtension(fileName, extensions)).toBe(false);
  });
});

describe("isContainsIgnorePattern", () => {
  it("should return true when the fileName contains the ignorePattern", () => {
    const fileName = "exampleFile";
    const ignorePattern = "example";

    // Expected result: true (fileName contains 'example')
    expect(isNotContainsIgnorePattern(fileName, ignorePattern)).toBe(false);
  });

  it("should return false when the fileName does not contain the ignorePattern", () => {
    const fileName = "exampleFile";
    const ignorePattern = "ignore";

    // Expected result: false (fileName does not contain 'ignore')
    expect(isNotContainsIgnorePattern(fileName, ignorePattern)).toBe(true);
  });
});
