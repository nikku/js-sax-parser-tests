'use strict';

var EasyParser = require('easysax');
var SaxParser = require('sax').SAXParser;
var Saxen = require('saxen');

var fs = require('fs');

const xml = fs.readFileSync('complex.bpmn', 'utf-8');

var button0 = document.createElement('button');
button0.textContent = 'PARSE EasySax';
button0.onclick = test('easy', parseEasy);
document.querySelector('.main').appendChild(button0);

var button1 = document.createElement('button');
button1.textContent = 'PARSE SAX';
button1.onclick = test('sax', parseSax);
document.querySelector('.main').appendChild(button1);

var button2 = document.createElement('button');
button2.textContent = 'PARSE Saxen';
button2.onclick = test('saxen', parseSaxen);
document.querySelector('.main').appendChild(button2);


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

    var msg = name + ': time=' + result + 'ms, avg=' + avg + 'ms'
    console.log(msg);

    document.querySelector('#results').textContent += (msg + '\n');
  };
}


function parseEasy(name) {

  var parser = new EasyParser();

  var nodeCount = 0;

  parser.ns('d', {
    'http://www.omg.org/spec/BPMN/20100524/MODEL': 'bpmn',
    'http://www.omg.org/spec/BPMN/20100524/DI': 'bpmndi',
    'http://www.omg.org/spec/DD/20100524/DC': 'dc',
    'http://www.omg.org/spec/DD/20100524/DI': 'di',
    'http://www.signavio.com': 'signavio',
    'http://www.w3.org/2001/XMLSchema-instance': 'xsi',

    'http://dummy': 'd',
  });

  parser.on('startNode', function(name, getAttrs, decodeEntities, tagend) {

    nodeCount++;

    var attrs = getAttrs();

    Object.keys(attrs).forEach(function(k) {
      decodeEntities(attrs[k]);
    });

  });

  parser.on('endNode', function(name) {
    // console.log(name + '/>');
  });

  parser.on('text', function(text, decodeEntities) {
    decodeEntities(text);
  });


  console.time(name);
  parser.parse(xml);
  console.timeEnd(name);
  console.log('EASYSAX: parsed ' + nodeCount + 'nodes');
}


function parseSaxen(name) {

  var parser = new Saxen();

  var nodeCount = 0;

  parser.ns({
    'http://www.omg.org/spec/BPMN/20100524/MODEL': 'bpmn',
    'http://www.omg.org/spec/BPMN/20100524/DI': 'bpmndi',
    'http://www.omg.org/spec/DD/20100524/DC': 'dc',
    'http://www.omg.org/spec/DD/20100524/DI': 'di',
    'http://www.signavio.com': 'signavio',
    'http://www.w3.org/2001/XMLSchema-instance': 'xsi'
  });

  parser.on('openTag', function(name, getAttrs, decodeEntities, tagend) {

    nodeCount++;

    var attrs = getAttrs();

    Object.keys(attrs).forEach(function(k) {
      decodeEntities(attrs[k]);
    });

  });

  parser.on('closeTag', function(name) {
    // console.log(name + '/>');
  });

  parser.on('text', function(text, decodeEntities) {
    decodeEntities(text);
  });

  console.time(name);
  parser.parse(xml);
  console.timeEnd(name);
  console.log('SAXEN: parsed ' + nodeCount + 'nodes');
}


function parseSax(name) {

  var nodeCount = 0;
  var parser = new SaxParser(true);

  parser.onopentag = function(node) {
    nodeCount++;
    // opened a tag.  node has "name" and "attributes"
  };

  parser.onclosetag = function(node) {
    // an attribute.  attr has "name" and "value"
  };

  parser.ontext = function(text) {
    // an attribute.  attr has "name" and "value"
  };

  console.time(name);
  parser.write(xml).close();
  console.timeEnd(name);
  console.log('SAX: parsed ' + nodeCount + 'nodes');
}