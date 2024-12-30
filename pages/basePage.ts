import BrowserContext from '../utils/BrowserContext';
import { logger } from '../utils/logging';
import { Page } from 'puppeteer';

export class BasePage {
    public page!: Page;

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

    async findElement(selector: string) {
        if (selector.startsWith('//') || selector.startsWith('(')) {
            return await this.page.$x(selector);
        } else {
            return await this.page.$(selector);
        }
    }

    async click(selector: string) {
        const element = await this.findElement(selector);
        if (Array.isArray(element)) {
            await element[0].click();
        } else {
            await element?.click();
        }
    }

    async fill(selector: string, text: string) {
        const element = await this.findElement(selector);
        if (Array.isArray(element)) {
            await element[0].type(text);
        } else {
            await element?.type(text);
        }
    }

    async waitForSelector(selector: string) {
        if (selector.startsWith('//') || selector.startsWith('(')) {
            await this.page.waitForXPath(selector);
        } else {
            await this.page.waitForSelector(selector);
        }
    }

    async getText(selector: string): Promise<string | null> {
        const element = await this.findElement(selector);
        if (Array.isArray(element)) {
            if (!element[0]) {
                return null;
            }
            const text = await this.page.evaluate(el => el.textContent, element[0]);
            return text;
        } else {
            if (!element) {
                return null;
            }
            const text = await this.page.evaluate(el => el.textContent, element);
            return text;
        }
    }

    async isVisible(selector: string): Promise<boolean> {
        const element = await this.findElement(selector);
        if (Array.isArray(element)) {
            return element[0] !== null && await element[0].boundingBox() !== null;
        } else {
            return element !== null && await element.boundingBox() !== null;
        }
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png` });
        logger.info(`Screenshot taken: ${name}`);
    }
}