import { test, expect } from '@playwright/test';
import { PageFactory } from '../utils/pageFactory';
import users from '../data/users.json';
import { logger } from '../utils/logging';
import BrowserContext from '../utils/BrowserContext';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

test.beforeEach(async () => {
  loginPage = PageFactory.getPage('LoginPage') as LoginPage;
  await loginPage.init();
});

test('standard user can login', async () => {
  await loginPage.navigate('/');
  expect(await loginPage.login(users.standardUser.username, users.standardUser.password)).toBeTruthy();
  expect(await loginPage.page.url()).toContain('/inventory.html');
  logger.info('Login test passed');
});

test('Performance Glitch user can login', async () => {
  await loginPage.navigate('/');
  expect(await loginPage.login(users.performance_glitch_user.username, users.performance_glitch_user.password)).toBeTruthy();
  expect(await loginPage.page.url()).toContain('/inventory.html');
  logger.info('Glitch Login test passed');
});

test.afterEach(async () => {
  await loginPage.page.close();
  await BrowserContext.closeInstance();
});
