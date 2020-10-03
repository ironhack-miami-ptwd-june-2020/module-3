// ************************************************************************************
// https://www.codewars.com/kata/the-hashtag-generator
// The marketing team is spending way too much time typing in hashtags.
// Let's help them with our own Hashtag Generator!

// Here's the deal:

// It must start with a hashtag (#).
// All words must have their first letter capitalized.
// If the final result is longer than 140 chars it must return false.
// If the input or the result is an empty string it must return false.
// Examples:
// " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
// "    Hello     World   "                  =>  "#HelloWorld"
// ""                                        =>  false
// ************************************************************************************

// option 1:

function generateHashtag(str) {
  if (string.trim() === '') return false;

  const camelCasedStr = str
    .split(' ')
    .map(word => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join('');

  const strWithHash = `#${camelCasedStr.trim()}`;

  return strWithHash.length > 140 ? false : strWithHash;
}

// option 2:

function generateHashtag(str) {
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ' && str[i - 1] === ' ') {
      newStr += str[i].toUpperCase();
    } else if (str[i] !== ' ') {
      newStr += str[i];
    }
  }
  newStr = '#' + newStr[0].toUpperCase() + newStr.slice(1);

  return newStr.length > 140 ? false : newStr;
}
