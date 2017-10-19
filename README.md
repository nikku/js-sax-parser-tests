# Benchmarking JS XML parsers

This small test compares the following SAX-style XML parsers avaliable:

* [sax-js](https://github.com/isaacs/sax-js)
* [easysax](https://github.com/vflash/easysax)

## Results

### Size

Comparing parsers by bundled size:

| parser | default | gzipped |
| :--- | ---:|---:|
| sax-js | 40KB | 12 KB |
| easysax | 20KB | 8KB |


### XML Parse Time

Parsing [`./complex.bpmn`](./complex.bpmn).

| parser | average time |
| :--- | ---:|
| sax-js | 37.8ms |
| easysax | 3.2ms |

Cf. [tests](./index.js).


## How to Run

```
npm install

npm run bundle

# open index.html in a web browser
```

 :rocket:
