const COMMENTS_REGEX = /^ *\#(.*)\n/gm;
const EXTRA_SPACES_REGEX = /\ +/g;

/**
 * @param {string} str
 * @returns {string}
 */
export default function minifyGraphQLString(str) {
  return str
    .replaceAll(COMMENTS_REGEX, "")
    .replaceAll("\n", "")
    .replaceAll(EXTRA_SPACES_REGEX, " ")
    .trim();
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe.concurrent("minifyGraphQLString", () => {
    it("should remove comments", () => {
      const str = `
      hello
      # world
      !
      `;
      const correctResult = "hello !";

      const result = minifyGraphQLString(str);

      expect(result).toEqual(correctResult);
    });

    it("should remove newlines", () => {
      const str = `a\nbc\nd`;
      const correctResult = "abcd";

      const result = minifyGraphQLString(str);

      expect(result).toEqual(correctResult);
    });

    it("should remove extra spaces", () => {
      const str = `a  b            cd`;
      const correctResult = "a b cd";

      const result = minifyGraphQLString(str);

      expect(result).toEqual(correctResult);
    });
  });
}
