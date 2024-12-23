import { chromium, Browser, Page } from 'playwright';

/**
 * A singleton class that manages the browser and page instances.
 * 
 * The `BrowserContext` class provides methods to get and close the singleton instances
 * of the browser and page. It ensures that only one instance of the browser and page
 * is created and reused throughout the application.
 * 
 * @class BrowserContext
 * @private
 * @static
 */
class BrowserContext {
  private static browserInstance: Browser | null;
  private static pageInstance: Page | null;

  private constructor() {}

  /**
   * Gets the singleton instance of the browser page.
   * If the browser instance is not already created, it launches a new browser.
   * If the page instance is not already created, it opens a new page in the browser.
   *
   * @returns {Promise<Page>} A promise that resolves to the browser page instance.
   */
  static async getInstance(): Promise<Page> {
    if (!BrowserContext.browserInstance) {
        BrowserContext.browserInstance = await chromium.launch();
    }
    if (!BrowserContext.pageInstance) {
        BrowserContext.pageInstance = await BrowserContext.browserInstance.newPage();
    }
    return BrowserContext.pageInstance;
  }

  /**
   * Closes the current browser and page instances if they exist.
   * 
   * This method checks if there are existing instances of the browser and page.
   * If they exist, it closes them and sets their references to null.
   * 
   * @returns {Promise<void>} A promise that resolves when both instances are closed.
   */
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
