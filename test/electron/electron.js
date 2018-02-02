const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = require('assert');

var appPath = path.join(__dirname, '../..');

var electronPath = path.join(appPath, 'node_modules', '.bin', 'electron');

if (process.platform === 'win32') {
    electronPath += '.cmd';
}


var app = new Application({
            path: electronPath,
            args: [appPath]
        });


global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});


describe('application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    return app.start()
  })

  afterEach(function () {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })

  it('shows an initial window', function () {
    return app.client.getWindowCount().then(function(count) {
      assert.equal(count, 1);
    });
  })

  it('shows an initial window', function () {
    return app.client.getWindowCount().should.eventually.equal(1)
  })

})
