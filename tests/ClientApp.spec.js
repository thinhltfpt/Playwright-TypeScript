const {test,expect} = require('@playwright/test');


test('Browser Context - Validating error login', async ({page}) => {
    
    await page.goto('https://murex.wd3.myworkdayjobs.com/en-US/MurexCareerPage1/login');

    await page.waitForLoadState('networkidle');
    await page.locator('//button[text()="Accept Cookies"]').click();
    await page.locator('//input[@data-automation-id="email"]').fill('letienthinh02.02@gmail.com');
    await page.locator('//input[@data-automation-id="password"]').fill('Quametmoi123@');

    await page.locator('//button[@data-automation-id="signInSubmitButton"]').click({
    force: true
});  

    // await page.waitForSelector('//button[@role="tab"]')
    await page.locator('//button[@role="tab"]').first().waitFor({ state: 'visible' });
    const TabNames = await page.locator('//button[@role="tab"]').allTextContents();
    console.log('✅ Tab Names:', TabNames);
    
    // // In từng tab
    // for (let i = 0; i < TabNames.length; i++) {
    //     console.log(`Tab ${i + 1}: ${TabNames[i]}`);
    // }
    
    // Assert
    expect(TabNames.length).toBeGreaterThan(0);
    expect(TabNames).toContain('Active (0)');

});

test('Browser Context - Validating dropdown', async ({page}) => {
    test.setTimeout(60000)
    await page.goto('https://murex.wd3.myworkdayjobs.com/en-US/MurexCareerPage1/login');
    await page.locator('//button[text()="Accept Cookies"]').click();
    await page.locator('//input[@data-automation-id="email"]').fill('letienthinh02.02@gmail.com');
    await page.locator('//input[@data-automation-id="password"]').fill('Quametmoi123@');
    
    await page.locator('//button[@data-automation-id="signInSubmitButton"]').click({
        force: true
    }); 
    await page.locator('//button[@role="tab"]').first().waitFor({ state: 'visible' });
    const TabNames = await page.locator('//button[@role="tab"]').allTextContents();
    console.log('✅ Tab Names:', TabNames);
    await page.waitForLoadState('networkidle');
    await page.goto('https://www.murex.com/en/contact-us');
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(10000)
    const dropdown = page.locator('//select[@id="murexEventsandNews"]');
    await dropdown.waitFor({ state: 'visible' });
    dropdown.selectOption("Yes");
    //checkk 
    // Bosch branch
    await page.pause();
});

test('Handling browser tabs', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("//a[contains(@href,'documents-request')]").click()
    ]);
    await newPage.waitForLoadState();
    const loginButton = newPage.locator('//a[text()="Login"]');
    await expect(loginButton).toBeVisible();
    console.log('New tab URL:', newPage.url());
    const title = await newPage.title();
    await page.locator('//input[@id="username"]').fill('Le Tien Thinh');
    console.log(await page.locator('//input[@id="username"]').inputValue());
    await page.pause();
    await newPage.close();
});
