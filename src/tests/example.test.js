import { step } from "mocha-steps"
//import puppeteer from "puppeteer"
import Page from "../builder"
import {expect} from 'chai'

describe('Mocha steps demo', () => {
  //let browser
  let page
  

  before(async () => {
    //browser = await puppeteer.launch({headless: false,slowMo: 25,defaultViewport: null,args: ['--start-maximized']})
    page = await Page.build('Desktop')
    
    //await page.setDefaultTimeout(7000)
  })

  after(async () => {
    await page.close()
    
  })

  step('should load google homepage', async () => {
    await page.goto('http://zero.webappsecurity.com/')
    const signInButton = await page.isElementVisible('#signin_button')
    expect(signInButton).to.be.true
  })

  step('should display login form', async () => {
    await page.waitAndClick('#signin_button')
    const loginForm = await page.isElementVisible('#login_form')
    expect(loginForm).to.be.true
    const signInButton = await page.isElementVisible('#signin_button')
    expect(signInButton).to.be.false
  })

  step('should login into application', async () => {
    await page.waitAndType('#user_login', 'username')
    await page.waitAndType('#user_password', 'password')
    await page.waitAndClick('.btn-primary')
    await page.goBack()
    const navbar = await page.isElementVisible("#nav")
    expect(navbar).to.be.true
  })
  
})