const {test,expect} = require('@playwright/test');

test('Handling browser tabs', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.demoblaze.com/');

    const productName = "Samsung galaxy s6";
    const products = await page.locator("h4.card-title");
    await expect(products.first()).toBeVisible() // nên wait visible cho element giống selenium rồi mới làm gì làm

    const count = await products.count();

console.log("Count =", count);

for (let i = 0; i < count; i++) {
    const product = products.nth(i);
    const text = (await product.textContent())?.trim();

    console.log(i, text);

    if (text === productName) {
        console.log("Found");

        await product.click();

        console.log("Clicked");

        break;
    }
}

await page.pause();
});