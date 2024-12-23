import { test, expect } from '@playwright/test';
import { PageFactory } from '../utils/PageFactory';
import users from '../data/users.json';
import products from '../data/products.json';
import { logger } from '../utils/logging';
import BrowserContext from '../utils/BrowserContext';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/inventoryPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.beforeEach(async () => {
  loginPage = PageFactory.getPage('LoginPage') as LoginPage;
  inventoryPage = PageFactory.getPage('InventoryPage') as InventoryPage;
  await loginPage.init();
  await inventoryPage.init();
  await loginPage.navigate('/');
  await loginPage.login(users.standardUser.username, users.standardUser.password);
  //await inventoryPage.navigate('/inventory.html');
});

test('add and remove item from cart', async () => {
    await test.step('Add item to cart', async () => {
        await inventoryPage.addItemToCart(products[0].name);
        expect(await inventoryPage.getCartItemCount()).toBe(1);
        logger.info('Add item to cart test passed');
    });

    await test.step('Remove item from cart', async () => {
        await inventoryPage.removeItemFromCart(products[0].name);
        expect(await inventoryPage.getCartItemCount()).toBe(0);
        logger.info('Remove item from cart test passed');
    });
});

test.afterEach(async () => {
  await loginPage.page.close();
  await BrowserContext.closeInstance();
});
