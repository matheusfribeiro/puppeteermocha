import puppeteer from "puppeteer";

export default class Builder {
  static async build(viewport) {
    const launchOptions = {
      headless: false,
      slowMo: 15,
      args: [
        '--start-maximized', 
        '--no-sandbox', 
        '--disabel-setui-sandbox', 
        '--disable-web-security']
    }

    const browser = await puppeteer.launch(launchOptions)
    const page = await browser.newPage()
    const extendedPage = new Builder(page)
    await page.setDefaultTimeout(10000)

    switch(viewport) {
      case 'Mobile':
        const mobileViewport = puppeteer.KnownDevices['Iphone 11']
        await page.emulate(mobileViewport)
        break
      case 'Tablet':
        const tabletViewport = puppeteer.KnownDevices['Ipad landscape']
        await page.emulate(tabletViewport)
        break
      case 'Desktop':
        await page.setViewport({ width: 800, height: 600})
        break
        default:
          throw new Error('Supported devices are only Mobile | Tablet | Desktop')
    }

    return new Proxy(extendedPage, {
      get: (target, property, receiver) => {
        if (target[property]) {
          return target[property];
        }

        let value = browser[property];
        if (value instanceof Function) {
          return function (...args) {
            return value.apply(this === receiver ? browser : this, args);
          };
        }

        value = page[property];
        if (value instanceof Function) {
          return function (...args) {
            return value.apply(this === receiver ? page : this, args);
          };
        }

        return value;
      },
    });
  } 

  constructor(page) {
    this.page = page
  }

  async waitAndClick(selector) {
    await this.page.waitForSelector(selector)
    await this.page.click(selector)
  }

  async waitAndType(selector, text) {
    await this.page.waitForSelector(selector)
    await this.page.type(selector, text)
  }

  async getText(selector) {
    await this.page.waitForSelector(selector)
    const text = await this.page.$eval(selector, e => e.innerHTML)
    return text
  }

  async getCount(selector) {
    await this.page.waitForSelector(selector)
    const count = await this.page.$$eval(selector, items => items.length)
    return count
  }

  async waitFotXPathAndClick(xpath) {
    await this.page.waitForXPath(xpath)
    const elements = await this.page.$x(xpath)
    if(elements.length > 1) {
      console.warn('waitForXPathAndClick returned more than 1 result')
    }
    await elements[0].click()
  }

  async isElementVisible(selector) {
    let visible = true
    await this.page.waitForSelector(selector, { visible: true, timeout: 3000}).catch(() => {
      visible = false
    })
    return visible
  }

  async isXPathVisible(selector) {
    let visible = true
    await this.page.waitForXPath(selector, {visible: true, timeout: 3000}).catch(() => {
      visible = false
    })
    return visible
  }
}