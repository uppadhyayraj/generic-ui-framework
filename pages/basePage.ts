import BrowserContext from '../utils/BrowserContext';
import { logger } from '../utils/logging';
import { Page } from '@playwright/test';

export class BasePage {
    public page: Page;

    constructor() {
    }

    async init() {
        this.page = await BrowserContext.getInstance();
    }

    async closeBrowser() {
        await BrowserContext.closeInstance();
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(selector: string) {
        await this.page.click(selector);
    }

    async fill(selector: string, text: string) {
        await this.page.fill(selector, text);
    }

    async waitForSelector(selector: string) {
        await this.page.waitForSelector(selector);
    }

    async getText(selector: string): Promise<string | null> {
        const element = await this.page.$(selector);
        if (!element) {
            return null;
        }
        const text = await element.textContent();
        return text;
    }

    async isVisible(selector: string): Promise<boolean> {
        return await this.page.isVisible(selector);
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
        logger.info(`Screenshot taken: ${name}`);
    }
}
