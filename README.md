# Benchmarking JS XML parsers

This small test compares the following SAX-style XML parsers avaliable:

* [sax-js](https://github.com/isaacs/sax-js)
* [easysax](https://github.com/vflash/easysax)
* [saxen](https://github.com/nikku/saxen)

## Test Coverage

The following aspects are tested

* events: `openTag`, `closeTag`, `text`
* attribute processing on
* entity decoding on


## Results

### Size

Comparing parsers by bundled size:

| parser | default | min+gzipped |
| :--- | ---:|---:|
| sax-js | 40KB | 6.7 KB |
| easysax | 20KB | 2.1KB |
| saxen | 21KB | 2.6KB |

### XML Parse Time

Parsing [`./complex.bpmn`](./complex.bpmn).

| parser | average time |
| :--- | ---:|
| sax-js | 25.3ms |
| easysax | 5.2ms |
| saxen | 5.1ms |

Cf. [tests](./index.js).


## How to Run

```
npm install

# test minify
npm run minify

# test performance (in browser)
npm run perf

# open index.html in a web browser
```

 :rocket:
