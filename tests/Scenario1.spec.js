const {test,expect} = require('@playwright/test');

test('Handling browser tabs', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.demoblaze.com/');

    const productName = "Samsung galaxy s6";
    const products = await page.locator("h4.card-title");
    //await expect(products.first()).toBeVisible() // nên wait visible cho element giống selenium rồi mới làm gì làm
    await products.first().waitFor({ state: 'visible' });

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

test.only('Handling 2', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

    await page.locator('//input[@id="userEmail"]').fill('letienthinh@gmail.com');
    await page.locator('//input[@id="userPassword"]').fill('Thinh221998@');
    await page.locator('//input[@id="login"]').click();

    const productName = "ZARA COAT 3";
    const addToCart = await page.locator("//b[text()='ZARA COAT 3']/../following-sibling::button[text()=' Add To Cart']");
    // await addToCart.waitFor({ state: 'visible' });
    await addToCart.click();

    await page.locator("//button[text()='  Cart ']").click();
    await page.locator("//button[text()='Buy Now']").click();

    await page.locator("[placeholder='Select Country']")
          .pressSequentially("vi");

    const options = page.locator(".ta-item");

    await expect(options.first()).toBeVisible();

    const count = await options.count();

    for (let i = 0; i < count; i++) {
        const option = options.nth(i);

        const text = (await option.textContent())?.trim();

        if (text === "Vietnam") {
            await option.click();
            break;
        }
    }
    console.log(await page.locator("[placeholder='Select Country']").inputValue());   

    

await page.pause();
});