'use strict';

var EasyParser = require('easysax');
var SaxParser = require('sax').SAXParser;

var fs = require('fs');

const xml = fs.readFileSync('complex.bpmn', 'utf-8');

var button0 = document.createElement('button');
button0.textContent = 'PARSE EASY';
button0.onclick = parseEasy;
document.querySelector('.main').appendChild(button0);

var button1 = document.createElement('button');
button1.textContent = 'PARSE SAX';
button1.onclick = parseSax;
document.querySelector('.main').appendChild(button1);



function parseEasy() {

var parser = new EasyParser();

parser.on('error', function() {
  console.log('error', arguments);
});

parser.ns('xxx', {
  'http://xxx': 'xxx',
  // 'http://www.omg.org/spec/BPMN/20100524/MODEL': 'bpmn',
  'http://www.omg.org/spec/DD/20100524/DC': 'blub'
});

var nodeCount = 0;

parser.on('startNode', function(name, attrs, uq, tagend) {

  nodeCount++;

});

parser.on('endNode', function(name) {
  // console.log(name + '/>');
});


console.time('easysax');
parser.parse(xml);
console.timeEnd('easysax');
console.log('parsed nodes', nodeCount);
}


function parseSax() {

var parser = new SaxParser(true);

parser.onerror = function(e) {
  console.log(error);
  // an error happened.
};
parser.ontext = function(t) {
  // got some text.  t is the string of text.
};

var nodeCount = 0;
parser.onopentag = function(node) {
  nodeCount++;
  // opened a tag.  node has "name" and "attributes"
};
parser.onattribute = function(attr) {
  // an attribute.  attr has "name" and "value"
};
parser.onend = function() {
  // parser stream is done, and ready to have more stuff written to it.
};

console.time('sax-js');
parser.write(xml).close();
console.timeEnd('sax-js');
console.log('parsed nodes', nodeCount);
}