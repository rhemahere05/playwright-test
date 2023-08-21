import { test, expect } from '@playwright/test';

test('Home tab should be visible', async ({ page }) => {
  //load home page
  await page.goto('https://ueirorganic.com/');
  const home =  page.getByText('Home');
  await expect(home).toBeVisible();
});

test('list of product should be displayed', async ({ page }) => {
  await page.goto('https://ueirorganic.com/');
  const home =  page.getByText('Home');
  await expect(home).toBeVisible();
  await home.hover();
  await page.waitForSelector('ul.t4s-sub-column');

  // Find the list item containing the link with text "Honey"
  const ListItem = page.locator('//div[contains(@class,"t4s-sub-column-item")]/div');
 // await expect(ListItem).toHaveText(['Grocery']);
  await expect(ListItem.nth(0)).toHaveText(['Grocery']);
  await expect(ListItem.nth(1)).toHaveText(['Snacks']);
  await expect(ListItem.nth(2)).toHaveText(['Special']);
});

test('Honey should be available in list', async ({ page }) => {
  await page.goto('https://ueirorganic.com/');
  const home =  page.getByText('Home');
  await expect(home).toBeVisible();
  await home.hover();
  await page.waitForSelector('ul.t4s-sub-column');

  // Find the list item containing the link with text "Honey"
  const honeyListItem = page.locator('ul.t4s-sub-column li.t4s-menu-item:has-text("Honey")').nth(0);
  await expect(honeyListItem).toHaveText(['Honey']);
});

test('Gulkand Honey 250g product should be visible', async ({ page }) => {
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

});

test('On click of add to cart summery page should be visible', async ({ page }) => {
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
  await expect(page).toHaveTitle('Your Shopping Cart – Ueir Organic Foods')

});

test('On click of view cart, card details should be displayed', async ({ page }) => {
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
  const addToCard = page.getByText('Add to cart');
  await addToCard.click();

  //checkout
  await page.getByRole('button', { name: 'Check Out' }).click();
  const frame = await page.locator('flo-checkout');
  await expect(frame).toBeVisible;

});