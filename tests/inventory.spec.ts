import { expect } from 'chai';
import { PageFactory } from '../utils/PageFactory';
import users from '../data/users.json';
import products from '../data/products.json';
import { logger } from '../utils/logging';
import BrowserContext from '../utils/BrowserContext';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

beforeEach(async () => {
  loginPage = PageFactory.getPage('LoginPage') as LoginPage;
  inventoryPage = PageFactory.getPage('InventoryPage') as InventoryPage;
  await loginPage.init();
  await inventoryPage.init();
  await loginPage.navigate('https://www.saucedemo.com/');
  await loginPage.login(users.standardUser.username, users.standardUser.password);
});

it('add and remove item from cart', async () => {
    await inventoryPage.addItemToCart(products[0].name);
    expect(await inventoryPage.getCartItemCount()).to.equal(1);
    logger.info('Add item to cart test passed');

    await inventoryPage.removeItemFromCart(products[0].name);
    expect(await inventoryPage.getCartItemCount()).to.equal(0);
    logger.info('Remove item from cart test passed');
});

afterEach(async () => {
  await loginPage.page.close();
  await BrowserContext.closeInstance();
});
