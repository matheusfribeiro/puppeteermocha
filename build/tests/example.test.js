"use strict";

var _mochaSteps = require("mocha-steps");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Mocha steps demo', function () {
  //let browser
  var page = void 0;

  before(async function () {
    //browser = await puppeteer.launch({headless: false,slowMo: 25,defaultViewport: null,args: ['--start-maximized']})
    page = await _builder2.default.build('Desktop');

    //await page.setDefaultTimeout(7000)
  });

  after(async function () {
    await page.close();
  });

  (0, _mochaSteps.step)('should load google homepage', async function () {
    await page.goto('http://zero.webappsecurity.com/');
    await page.waitAndClick('#onlineBankingMenu');
    await new Promise(function (r) {
      return setTimeout(r, 5000);
    });
  });
});
//import puppeteer from "puppeteer"