const {test,expect} = require('@playwright/test');


// test('Browser First Test', async ({browser}) => {
//     // neu nhu goi bien browser, page, page2 trong tham so thi khong can phai tao moi context va page nua, vi no da duoc tao san trong file playwright.config.js
//     const context1 = await browser.newContext();
//     const page = await context1.newPage();
//     const page2 = await context1.newPage();
    
//     await page.goto('https://www.rahulshettyacademy.com');
//     await page.goBack();
    
//     await page2.goto('https://www.google.com/');
    
//     let title = await page.title();
//     let title2 = await page2.title();
//     console.log(title);
//     console.log(title2);

//     await expect(page).toHaveTitle('Rahul Shetty Academy');
//     await expect(page2).toHaveTitle('Google');
//     await expect(title).toBe('Rahul Shetty Academy');
//     await expect(title2).toBe('Google');
// });

// test('Page First Test', async ({page}) => {
//     let title2 = await page2.title();
//     console.log(title);

//     await page.goto('https://www.rahulshettyacademy.com');
//     await page.goBack();

//     await page2.goto('https://www.google.com/');
    
// });

// Phai co async function de su dung await
test.only('First Test with Browser Context', async ({browser,page}) => {
    // neu nhu goi bien browser, page, page2 trong tham so thi khong can phai tao moi context va page nua, vi no da duoc tao san trong file playwright.config.js
    // const context1 = await browser.newContext();
    // const page = await context1.newPage();
    // const page2 = await context1.newPage();
    
    
    await page.goto('https://sauce-demo.myshopify.com/account/login');
    let title = await page.title();
    console.log(title);

    const username = page.locator('//input[@id="customer_email"]');
    const password = page.locator('//input[@id="customer_password"]');
    const signInBtn = page.locator("//a[text()='Catalog']");
    // css type, fill
    // type la dien vao truong, fill la xoa truoc do va dien vao
    await username.fill('letienthinh02.02@gmail.com');   
    await password.fill('Thinh221998');

    // click
    await signInBtn.hover(50000);
   await signInBtn.click();

    await page.waitForTimeout(10000);
const Account = page.locator('//h1[@class="accounts-title"]');

await expect(Account).toHaveText('Account Details and Order History');
    


});
