"use strict";

var optimist = require('optimist')
  , os = require('os')
  , _ = require('underscore');

var browserMap = {
  's': 'Safari'
  , 'c': 'Chrome'
  , 'i': 'Internet Explorer'
  , 'ie': 'Internet Explorer'
  , 'ip': 'iPhone'
  , 'ipa': 'iPad'
  , 'a': 'Android'
};

var platformMap = {
  'w': 'Windows 2012',
  'w12': 'Windows 2012',
  'w8': 'Windows 2008',
  'wx': 'Windows XP',
  'm': 'Mac 10.9',
  'm9': 'Mac 10.9',
  'm8': 'Mac 10.8',
  'm6': 'Mac 10.6',
  'l': 'Linux'
};

var deviceMap = {
  'ip': 'iPhone Simulator'
  , 'ipa': 'iPad Simulator'
  , 'a': 'Android'
  , 'ae': 'Android Emulator'
};

module.exports = function() {
  var args = optimist
    .options('c', {
      alias: 'config',
      default: 'prod',
      demand: true
    })
    .options('t', {
      alias: 'test',
      default: 'web',
      demand: true
    })
    .options('b', {
      alias: 'browser',
      default: 'Chrome',
      demand: true
    })
    .options('d', {
      alias: 'device',
      demand: false
    })
    .options('p', {
      alias: 'platform',
      default: '',
      demand: false
    })
    .options('v', {
      alias: 'version',
      default: '',
      demand: false
    })
    .options('w', {
      alias: 'wait',
      default: false,
      demand: false
    })
    .options('l', {
      alias: 'localname',
      default: os.hostname(),
      demand: true
    })
    .boolean(['setup', 'wait'])
    .argv;

  // allow browser shortcuts
  var browser = args.b.toLowerCase();
  if (_.has(browserMap, browser)) {
    args.b = args.browser = browserMap[browser];
  }

  // allow platform shortcuts
  var plat = args.p.toLowerCase();
  if (_.has(platformMap, plat)) {
    args.p = args.platform = platformMap[plat];
  }

  if (args.d) {
    // allow device shortcuts
    var device = args.d.toLowerCase();
    if (_.has(deviceMap, device)) {
      args.d = args.device = deviceMap[device];
    }
  }

  return args;
};