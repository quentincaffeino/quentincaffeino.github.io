const REMOVE_INDENTATION_REGEX = /^\ +/gm;
const REMOVE_COMMENTS_REGEX = /^\#(.*)\n/gm;
const REMOVE_NEWLINES_REGEX = /\n/g;
const REMOVE_EXTRA_SPACES_REGEX = /\ +/g;

/**
 * @param {string} str
 * @returns {string}
 */
export default function graphqlMinify(str) {
  return str
    .replace(REMOVE_INDENTATION_REGEX, "")
    .replace(REMOVE_COMMENTS_REGEX, "")
    .replace(REMOVE_NEWLINES_REGEX, " ")
    .replace(REMOVE_EXTRA_SPACES_REGEX, " ")
    .trim();
}
