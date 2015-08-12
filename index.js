var Writer = require('broccoli-writer'),
  wrap = require('umd-wrap'),
  path = require('path'),
  util = require('util'),
  fs = require('fs'),
  Q = require('q');

function ObjectWriter( outputFile, outputData ) {
  if (!(this instanceof ObjectWriter)) {
    return new ObjectWriter(outputFile, outputData);
  }

  this.outputFile = outputFile;
  this.outputData = outputData;
}

ObjectWriter.prototype = Object.create(Writer.prototype);
ObjectWriter.prototype.constructor = ObjectWriter;

ObjectWriter.prototype.write = function( readTree, destDir ) {
  var data = typeof this.outputData === 'function' ? this.outputData() : this.outputData,
    pathname = path.resolve(destDir, this.outputFile),
    extname = path.extname(pathname);

  var out = JSON.stringify(data, null, 2);

  if (extname === '.json') {
    return fs.writeFileSync(pathname, out);
  }

  return Q.nfcall(wrap, {
    code: out,
    exports: 'data'
  }).then(function( out ) {
    return Q.nfcall(fs.writeFile, pathname, out);
  });
};

module.exports = ObjectWriter;