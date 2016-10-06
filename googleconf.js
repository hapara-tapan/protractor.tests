exports.config = {
  framework: 'jasmine2',
  allScriptsTimeout: 20000,
  getPageTimeout: 20000,
  restartBrowserBetweenTests: true,
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['googledashboard.smoketest.js']
}
