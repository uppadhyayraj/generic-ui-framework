import { chromium, Browser, Page } from 'playwright';

class BrowserContext {
  private static browserInstance: Browser | null;
  private static pageInstance: Page | null;

  private constructor() {}

  static async getInstance(): Promise<Page> {
    if (!BrowserContext.browserInstance) {
        BrowserContext.browserInstance = await chromium.launch();
    }
    if (!BrowserContext.pageInstance) {
        BrowserContext.pageInstance = await BrowserContext.browserInstance.newPage();
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