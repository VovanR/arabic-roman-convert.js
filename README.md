# arabic-roman-convert.js

<img align="right" width="120" height="120"
     src="./logo.svg" alt="Arabic Roman Convert logo">

[![Commitizen friendly][commitizen-image]][commitizen-url]
[![XO code style][codestyle-image]][codestyle-url]

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]

> Convert [Arabic][wiki-arabic] to [Roman][wiki-roman] UTF-8 numerals: 7 → Ⅶ

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
<script src="bower_components/arabic-roman-convert.js/dist/arabic-roman-convert.min.js"></script>
```
```js
var num = window.ArabicRoman.toRoman(2016);
//=> ⅯⅯⅩⅥ
```

### Node
```sh
npm install --save arabic-roman-convert.js
```
```js
var arabicRomanConvert = require('arabic-roman-convert.js');

var num = arabicRomanConvert.toRoman(2016);
//=> ⅯⅯⅩⅥ
```

## License
MIT © [Vladimir Rodkin](https://github.com/VovanR)

[wiki-arabic]: https://en.wikipedia.org/wiki/Arabic_numerals
[wiki-roman]: https://en.wikipedia.org/wiki/Roman_numerals
[demo]: https://vovanr.github.io/arabic-roman-convert.js

[commitizen-url]: https://commitizen.github.io/cz-cli/
[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square

[codestyle-url]: https://github.com/xojs/xo
[codestyle-image]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square

[npm-url]: https://npmjs.org/package/arabic-roman-convert.js
[npm-image]: https://img.shields.io/npm/v/arabic-roman-convert.js.svg?style=flat-square

[travis-url]: https://travis-ci.org/VovanR/arabic-roman-convert.js
[travis-image]: https://img.shields.io/travis/VovanR/arabic-roman-convert.js.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/VovanR/arabic-roman-convert.js
[coveralls-image]: https://img.shields.io/coveralls/VovanR/arabic-roman-convert.js.svg?style=flat-square

[depstat-url]: https://david-dm.org/VovanR/arabic-roman-convert.js
[depstat-image]: https://david-dm.org/VovanR/arabic-roman-convert.js.svg?style=flat-square

[depstat-dev-url]: https://david-dm.org/VovanR/arabic-roman-convert.js
[depstat-dev-image]: https://david-dm.org/VovanR/arabic-roman-convert.js/dev-status.svg?style=flat-square
