var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'Documents/reports',
  filename: 'my-report.html'
});

exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  //specs: ['singledashboardsmoketest.js','dmgoogledashboard.smoketest.js','splitdashboard.smoketest.js'],
  specs: ['splitdashboard.smoketest.js','dmgoogledashboard.smoketest.js','singledashboardsmoketest.js'],
  
  multiCapabilities: [{
  'browserName': 'firefox',
  'shardTestFiles': true,
  'maxInstances': 1
}, {
  'browserName': 'chrome',
  'shardTestFiles': true,
  'maxInstances': 1
}],

  allScriptsTimeout: 20000,
  getPageTimeout: 20000,
  restartBrowserBetweenTests: false,

  // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },

  onPrepare: function(){
    //browser.manage().timeouts().implicitlyWait(5000);
    global.EC = protractor.ExpectedConditions;
	jasmine.getEnv().addReporter(reporter);
	},

	jasmineNodeOpts: {
	defaultTimeoutInterval: 2500000
	},
	  // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
	}
}