# Benchmarking JS SAX-style parsers

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
