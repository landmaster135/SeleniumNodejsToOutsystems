class Inspector{
    getAllClassName = async (driver, className) => {
        const texts = [];
        for (let i = 0; i < 10; i++){
            let text = '';
            text = await driver.findElement(By.className("OSInline")).getText();
            texts.push(text);
        }
        console.log(texts);
    }
}

