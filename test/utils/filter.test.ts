import {
  filterByNameExtensionAndIgnorePattern,
  filterByExtension,
  isNotContainsIgnorePattern
} from "../../src/utils/filter";

describe("filterByNameExtensionAndIgnorePattern", () => {
  it("should return true when all conditions are met", () => {
    const fileName = "exampleFile";
    const validExtension = ".js";
    const validFile = `${fileName}${validExtension}`;

    const filterByName = "example";
    const ignorePattern = "ignore";

    const result = filterByNameExtensionAndIgnorePattern(validFile, filterByName, ignorePattern);

    expect(result).toBe(true);
  });

  it("should return false when any condition is not met", () => {
    const fileName = "exampleFile";
    const invalidExtension = ".html";
    const invalidFile = `${fileName}${invalidExtension}`;

    const filterByName = "example";
    const ignorePattern = "ignore";

    const result = filterByNameExtensionAndIgnorePattern(invalidFile, filterByName, ignorePattern);

    // Expected result: false (fileName includes 'example', does not contain 'ignore', but has an invalid extension 'html')
    expect(result).toBe(false);
  });
});

describe("filterByExtension", () => {
  it("should return true when the file has a valid extension", () => {
    const fileName = "exampleFile.txt";
    const extensions = ["txt", "md", "json"];

    const result = filterByExtension(fileName, extensions);

    // Expected result: true (fileName has a valid extension 'txt')
    expect(result).toBe(true);
  });

  it("should return false when the file has an invalid extension", () => {
    const fileName = "exampleFile.html";
    const extensions = ["txt", "md", "json"];

    const result = filterByExtension(fileName, extensions);

    // Expected result: false (fileName has an invalid extension 'html')
    expect(result).toBe(false);
  });
});

describe("isContainsIgnorePattern", () => {
  it("should return true when the fileName contains the ignorePattern", () => {
    const fileName = "exampleFile";
    const ignorePattern = "example";

    const result = isNotContainsIgnorePattern(fileName, ignorePattern);

    // Expected result: true (fileName contains 'example')
    expect(result).toBe(false);
  });

  it("should return false when the fileName does not contain the ignorePattern", () => {
    const fileName = "exampleFile";
    const ignorePattern = "ignore";

    const result = isNotContainsIgnorePattern(fileName, ignorePattern);

    // Expected result: false (fileName does not contain 'ignore')
    expect(result).toBe(true);
  });
});
