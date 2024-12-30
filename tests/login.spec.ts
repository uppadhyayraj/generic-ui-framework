import { expect } from 'chai';
import { PageFactory } from '../utils/PageFactory';
import users from '../data/users.json';
import { logger } from '../utils/logging';
import BrowserContext from '../utils/BrowserContext';
import { LoginPage } from '../pages/loginPage';
import fs from 'fs';

let loginPage: LoginPage;

beforeEach(async () => {
  loginPage = PageFactory.getPage('LoginPage') as LoginPage;
  await loginPage.init();
});

it('standard user can login', async () => {
  await loginPage.navigate('https://www.saucedemo.com/');
  expect(await loginPage.login(users.standardUser.username, users.standardUser.password));
  expect(await loginPage.page.url()).contains('/inventory.html');
  logger.info('Login test passed');
});

it('Performance Glitch user can login', async () => {
  await loginPage.navigate('https://www.saucedemo.com/');
  expect(await loginPage.login(users.performance_glitch_user.username, users.performance_glitch_user.password));
  expect(await loginPage.page.url()).contains('/inventory.html');
  logger.info('Glitch Login test passed');
});

afterEach(async () => {
  await loginPage.page.close();
  await BrowserContext.closeInstance();
});
