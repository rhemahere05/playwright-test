import { test, expect } from '@playwright/test';

test('Test Ueir Organic site', async ({ page }) => {

  //load home page
  await page.goto('https://ueirorganic.com/');

  const home =  page.getByText('Home');
  await expect(home).toBeVisible();
  await home.hover();

  await page.waitForSelector('ul.t4s-sub-column');

  // Find the list item containing the link with text "Honey"
  const honeyListItem = page.locator('ul.t4s-sub-column li.t4s-menu-item:has-text("Honey")').nth(0);
  await expect(honeyListItem).toHaveText(['Honey']);
  await honeyListItem.click();

  //Select 'Gulkand Honey 250g' product
  const selectedHoneyLink = page.getByRole('link', { name: 'Gulkand Honey 250g' });
  await expect(selectedHoneyLink).toBeVisible();
  await selectedHoneyLink.click();

  //add selected product into card
  const addToCard = page.locator('button[name="add"]');
  await addToCard.click();

  //assert if minicart slider loads 
  const mini_cart = page.locator('t4s-mini_cart')
  await expect(mini_cart).toBeVisible();

  // select view cart from slider page
  await page.getByRole('link', { name: 'View cart' }).click();

  //checkout
  await page.getByRole('button', { name: 'Check Out' }).click();
});
