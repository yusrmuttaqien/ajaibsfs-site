/**
 * Merge string contained inside array
 * @param {Array} arr Define array of string
 * @param {Object} [options] Define function modifier
 * @param {String} [options.charBetween] Define character between concated string [' ']
 * @param {Boolean} [options.noSpaces] Define if merged string should have spaces between or not [false]
 * @returns Merged string
 */

export default function concat(arr, options = {}) {
  let result;

  arr.map((c) => {
    if (!result) {
      if (![undefined, null, false].includes(c)) {
        result = c;
      }
    } else if (result) {
      if (![undefined, null, false].includes(c)) {
        if (options.noSpaces) {
          result = result.concat(c);
        } else {
          result = result.concat(`${options.charBetween || ' '}${c}`);
        }
      }
    }
  });

  return result;
}
