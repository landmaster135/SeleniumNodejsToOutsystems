const webdriver = require('selenium-webdriver');
const { Builder, By, until } = webdriver;

const main = async() => {
    const capabilities = webdriver.Capabilities.chrome();
    capabilities.set('chromeOptions', {
        args: [
            '--headless',
            '--no-sandbox',
            '--disable-gpu',
            `--window-size=1980,1200`
            // other chrome options
        ]
    });
    const driver = await new Builder().withCapabilities(capabilities).build();

    const url = '';
    await driver.get(url);

    // todo

    driver.quit();
}

main();
