var writeObject = require('../index'),
  broccoli = require('broccoli'),
  faker = require('faker'),
  path = require('path');

describe('Broccoli config writer', function() {
  it('writes JSON', function() {
    var fixture = faker.helpers.userCard();

    var tree = writeObject('fixture.json', fixture);
    this.builder = new broccoli.Builder(tree);

    return this.builder.build().then(function( stat ) {
      var pathname = path.resolve(stat.directory, 'fixture.json'),
        data = require(pathname);

      assert.deepEqual(fixture, data);
    });
  });

  it('writes UMD', function() {
    var fixture = faker.helpers.userCard();

    var tree = writeObject('fixture.js', fixture);
    this.builder = new broccoli.Builder(tree);

    return this.builder.build().then(function( stat ) {
      var pathname = path.resolve(stat.directory, 'fixture.js'),
        data = require(pathname);

      assert.deepEqual(fixture, data);
    });
  });

  it('accepts functions', function() {
    var fixture = faker.helpers.userCard();

    var tree = writeObject('fixture.json', function() {
      return fixture;
    });

    this.builder = new broccoli.Builder(tree);

    return this.builder.build().then(function( stat ) {
      var pathname = path.resolve(stat.directory, 'fixture.json'),
        data = require(pathname);

      assert.deepEqual(fixture, data);
    });
  });

  afterEach(function() {
    if (this.builder) {
      this.builder.cleanup();
    }
  });
});