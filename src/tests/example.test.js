import { step } from "mocha-steps"
//import puppeteer from "puppeteer"
import Page from "../builder"

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
    await page.waitAndClick('#onlineBankingMenu')
    await new Promise(r => setTimeout(r, 5000))
  })

  
})