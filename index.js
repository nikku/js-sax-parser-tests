'use strict';

var EasyParser = require('easysax');
var SaxParser = require('sax').SAXParser;

var fs = require('fs');

const xml = fs.readFileSync('complex.bpmn', 'utf-8');

var button0 = document.createElement('button');
button0.textContent = 'PARSE EASY';
button0.onclick = test('easy', parseEasy);
document.querySelector('.main').appendChild(button0);

var button1 = document.createElement('button');
button1.textContent = 'PARSE SAX';
button1.onclick = test('sax', parseSax);
document.querySelector('.main').appendChild(button1);


function now() {
  return new Date().getTime();
}

function test(name, run) {

  function repeat(times) {
    for (var i = 0; i < times; i++) {
      run(name);
    }
  }

  return function() {
    console.log(name, 'warm up...');

    repeat(10);

    console.log(name, 'test run');

    var time = now();
    repeat(20);
    var result = now() - time;
    var avg = result / 15;

    console.log(name, 'time=' + result + 'ms, avg=' + avg + 'ms');
  };
}


function parseEasy(name) {

  var parser = new EasyParser();

  var nodeCount = 0;

  parser.on('error', function() {
    console.log('error', arguments);
  });

  parser.ns('xxx', {
    'http://xxx': 'xxx',
    // 'http://www.omg.org/spec/BPMN/20100524/MODEL': 'bpmn',
    'http://www.omg.org/spec/DD/20100524/DC': 'blub'
  });


  parser.on('startNode', function(name, attrs, uq, tagend) {

    nodeCount++;

  });

  parser.on('endNode', function(name) {
    // console.log(name + '/>');
  });


  console.time(name);
  parser.parse(xml);
  console.timeEnd(name);
  console.log('parsed ' + nodeCount + 'nodes');
}


function parseSax(name) {

  var nodeCount = 0;
  var parser = new SaxParser(true);

  parser.onerror = function(e) {
    console.log(error);
    // an error happened.
  };
  parser.ontext = function(t) {
    // got some text.  t is the string of text.
  };

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

  console.time(name);
  parser.write(xml).close();
  console.timeEnd(name);
  console.log('parsed ' + nodeCount + 'nodes');
}