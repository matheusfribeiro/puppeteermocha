import puppeteer from "puppeteer";

export default class Builder {
  static async build(viewport) {
    const launchOptions = {
      headless: true,
      slowMo: 0,
      defaultViewport: null,
      args: ['--start-maximized', '--no-sandbox', '--disabel-setui-sandbox', '--disable-web-security']
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
  } 
}