import { BasePage } from './basePage';
import { logger } from '../utils/logging'; 

export class LoginPage extends BasePage {
  constructor() {
    super();
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      await this.fill('#user-name', username);
      logger.info(`Filled username: ${username}`);
      await this.fill('#password', password);
      logger.info(`Filled password`);
      await this.click('#login-button');
      logger.info(`Clicked login button`);
      return true;
    } catch (error) {
      logger.info(`Login failed: ${error.message}`);
      return false;
    }
  }
}
