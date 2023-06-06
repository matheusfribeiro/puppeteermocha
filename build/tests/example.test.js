"use strict";

var _mochaSteps = require("mocha-steps");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

var _chai = require("chai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import puppeteer from "puppeteer"
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
    var signInButton = await page.isElementVisible('#signin_button');
    (0, _chai.expect)(signInButton).to.be.true;
  });

  (0, _mochaSteps.step)('should display login form', async function () {
    await page.waitAndClick('#signin_button');
    var loginForm = await page.isElementVisible('#login_form');
    (0, _chai.expect)(loginForm).to.be.true;
    var signInButton = await page.isElementVisible('#signin_button');
    (0, _chai.expect)(signInButton).to.be.false;
  });

  (0, _mochaSteps.step)('should login into application', async function () {
    await page.waitAndType('#user_login', 'username');
    await page.waitAndType('#user_password', 'password');
    await page.waitAndClick('.btn-primary');
    await page.goBack();
    var navbar = await page.isElementVisible("#nav");
    (0, _chai.expect)(navbar).to.be.true;
  });
});