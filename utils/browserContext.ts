import puppeteer, { Browser, Page } from 'puppeteer';

class BrowserContext {
  private static browserInstance: Browser | null = null;
  private static pageInstance: Page | null = null;

  private constructor() {}

  static async getInstance(): Promise<Page> {
    if (!BrowserContext.browserInstance) {
        BrowserContext.browserInstance = await puppeteer.launch({ headless: false });
    }
    if (!BrowserContext.pageInstance) {
        const pages = await BrowserContext.browserInstance.pages();
        BrowserContext.pageInstance = pages.length > 0 ? pages[0] : await BrowserContext.browserInstance.newPage();
    }
    return BrowserContext.pageInstance;
  }

  static async closeInstance() {
    if (BrowserContext.pageInstance) {
        await BrowserContext.pageInstance.close();
        BrowserContext.pageInstance = null;
    }
    if (BrowserContext.browserInstance) {
        await BrowserContext.browserInstance.close();
        BrowserContext.browserInstance = null;
    }
  }
}

export default BrowserContext;
