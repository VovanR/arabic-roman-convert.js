# arabic-roman-convert.js

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Convert [Arabic][wiki-arabic] to [Roman][wiki-roman] UTF-8 numerals

Demo: [vovanr.github.io/arabic-roman-convert.js][demo]

**Arabic numerals** `.arabicToRoman({Number|String})`
```
1 → Ⅰ
2 → Ⅱ
3 → Ⅲ
4 → Ⅳ
5 → Ⅴ
6 → Ⅵ
7 → Ⅶ
8 → Ⅷ
9 → Ⅸ
10 → Ⅹ
11 → Ⅺ
12 → Ⅻ
15 → ⅩⅤ
25 → ⅩⅩⅤ
50 → Ⅼ
100 → Ⅽ
500 → Ⅾ
1000 → Ⅿ
```

**Simple roman strings** `.convertRoman({String})`
```
I → Ⅰ
III → Ⅲ
vii → Ⅶ
ix → Ⅸ
X → Ⅹ
XV → ⅩⅤ
l → Ⅼ
c → Ⅽ
D → Ⅾ
M → Ⅿ
```

**Arabic number or simple Roman string** `.toRoman({String|Number})`
```
2 → Ⅱ
III → Ⅲ
vii → Ⅶ
9 → Ⅸ
X → Ⅹ
XV → ⅩⅤ
l → Ⅼ
100 → Ⅽ
D → Ⅾ
M → Ⅿ
```


## Install and Usage

### Bower
```sh
bower install --save arabic-roman-convert.js
```
```html
<link rel="stylesheet" href="bower_components/arabic-roman-convert.js/dist/arabic-roman-convert.min.js">
```
```js
var num = window.ArabicRoman.toRoman(2015);
console.log(num); // ⅯⅯⅩⅤ
```

### Node
```sh
npm i --save arabic-roman-convert.js
```
```js
var arabicRomanConvert = require('arabic-roman-convert.js');

var num = arabicRomanConvert.toRoman(2015);
console.log(num); // ⅯⅯⅩⅤ
```

[wiki-arabic]: http://en.wikipedia.org/wiki/Arabic_numerals
[wiki-roman]: http://en.wikipedia.org/wiki/Roman_numerals
[demo]: https://vovanr.github.io/arabic-roman-convert.js

[npm-url]: https://npmjs.org/package/arabic-roman-convert.js
[npm-image]: http://img.shields.io/npm/v/arabic-roman-convert.js.svg

[travis-url]: https://travis-ci.org/VovanR/arabic-roman-convert.js
[travis-image]: http://img.shields.io/travis/VovanR/arabic-roman-convert.js.svg

[coveralls-url]: https://coveralls.io/r/VovanR/arabic-roman-convert.js
[coveralls-image]: http://img.shields.io/coveralls/VovanR/arabic-roman-convert.js.svg

[depstat-url]: https://david-dm.org/VovanR/arabic-roman-convert.js
[depstat-image]: https://david-dm.org/VovanR/arabic-roman-convert.js.svg

[depstat-dev-url]: https://david-dm.org/VovanR/arabic-roman-convert.js
[depstat-dev-image]: https://david-dm.org/VovanR/arabic-roman-convert.js/dev-status.svg
