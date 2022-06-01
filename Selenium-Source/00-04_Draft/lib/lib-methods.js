const { Builder, By, until } = require('selenium-webdriver');
const util   = require('util');
const assert = require("assert");
const _      = require("lodash");
const path   = require('path');
const fs     = require("fs");
const fsp    = require('fs/promises');

// 一般ツール
const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
const assertEqual_and_log = (case_no, expected, actual) => {
    assert.equal(expected, actual);
    console.log(`${case_no},${expected},${actual}`);
};
const outputLog = (funcName, remark) => {
    console.log(`${funcName}: ${remark}`);
};
const getStrRepeatedToMark = (repeatStr, repeatNumberToMark=15) => {
    return repeatStr.repeat(repeatNumberToMark);
};
const getTextLines = (fileName) => {
    const separator = '\n';
    let text = fs.readFileSync(`./${fileName}`, 'utf8');
    let lines = text.toString().split(separator);
    return lines;
}

// Selenium関連ツール
class Operator{
    openAppViaO365 = async(driver, url, username, password, waitTimeToDisplay=40000) => {
        const funcName = 'openAppViaO365';
        
        await driver.get(url);
        await driver.manage().window().maximize();
        await outputLog(funcName, getStrRepeatedToMark('a'));
        await sleep(10000); 
    
        await driver.findElement(By.id("i0116")).sendKeys(username);
        await driver.findElement(By.id("idSIButton9")).click();
        await outputLog(funcName, getStrRepeatedToMark('b'));
        await sleep(10000);
    
        await driver.findElement(By.id("i0118")).sendKeys(password);
        await driver.findElement(By.id("idSIButton9")).click();
        await outputLog(funcName, getStrRepeatedToMark('c'));
        await sleep(10000);
    
        await driver.findElement(By.id("idBtn_Back")).click();
        await outputLog(funcName, getStrRepeatedToMark('d'));
        await sleep(waitTimeToDisplay);
    };
    openAppDirect = async(driver, url, waitTimeToDisplay=40000) => {
        const funcName = 'openAppDirect';
        
        await driver.get(url);
        await outputLog(funcName, getStrRepeatedToMark('a'));
        await sleep(waitTimeToDisplay);
    };
    openAppDev = async(driver, url, username, password, waitTimeToDisplay=40000) => {
        const funcName = 'openAppDev';

        await driver.get(url);
        await driver.manage().window().maximize();
        await outputLog(funcName, getStrRepeatedToMark('a'));
        await sleep(10000);

        await driver.findElement(By.xpath('//*[@id="Input_UsernameVal"]')).sendKeys(username);
        await outputLog(funcName, getStrRepeatedToMark('b'));
        await driver.findElement(By.xpath('//*[@id="Input_PasswordVal"]')).sendKeys(password);
        await outputLog(funcName, getStrRepeatedToMark('c'));
        await driver.findElement(By.xpath('//*[@id="b6-Button"]/button')).click();

        await sleep(waitTimeToDisplay); 
        await outputLog(funcName, getStrRepeatedToMark('d'));
    }
    clickElementsByElementArray = async(driver, elementArray) => {
        const funcName = 'clickElementsByElementArray';
        for (let i = 0; i < elementArray.length; i++){
            // scroll in the window.
            let element = await driver.findElement(By.id(idArray[i]));
            await outputLog(funcName, `${i}: ${getStrRepeatedToMark('a')}`);
            await driver.executeScript("arguments[0].scrollIntoView()", elementArray[i]);
            await outputLog(funcName, `${i}: ${getStrRepeatedToMark('b')}`);
            await sleep(1000);

            // click element.
            await elementArray[i].click();
            await sleep(1000);
            await outputLog(funcName, `${i}: ${getStrRepeatedToMark('c')}`);
        }
    };
    clickElementsByXpathArray = async(driver, xpathArray) => {
        const funcName = 'clickElementsByXpathArray';
        for (let i = 0; i < xpathArray.length; i++){
            // scroll in the window.
            let element = await driver.findElement(By.xpath(xpathArray[i]));
            await outputLog(funcName, `${i}: ${xpathArray[i]}: ${getStrRepeatedToMark('a')}`);
            await driver.executeScript("arguments[0].scrollIntoView()", element);
            await sleep(500);
            await outputLog(funcName, `${i}: ${xpathArray[i]}: ${getStrRepeatedToMark('b')}`);

            // click element.
            await element.click();
            await sleep(1000);
            await outputLog(funcName, `${i}: ${xpathArray[i]}: ${getStrRepeatedToMark('c')}`);
        }
    };
    clickElementsByIdArray = async(driver, idArray, sleepMilisecond=1000) => {
        const funcName = 'clickElementsByIdArray';
        for (let i = 0; i < idArray.length; i++){
            // scroll in the window.
            let element = await driver.findElement(By.id(idArray[i]));
            await outputLog(funcName, `${i}: ${idArray[i]}: ${getStrRepeatedToMark('a')}`);
            await driver.executeScript("arguments[0].scrollIntoView()", element);
            await outputLog(funcName, `${i}: ${idArray[i]}: ${getStrRepeatedToMark('b')}`);
            await sleep(sleepMilisecond);

            // click element.
            await element.click();
            await sleep(sleepMilisecond);
            await outputLog(funcName, `${i}: ${idArray[i]}: ${getStrRepeatedToMark('c')}`);
        }
    };
    clickElementByXpath = async(driver, xpath) => {
        const funcName = 'clickElementByXpath';
        // scroll in the window.
        let element = await driver.findElement(By.xpath(xpath));
        await driver.executeScript("arguments[0].scrollIntoView()", element);
        await outputLog(funcName, `${element}: ${getStrRepeatedToMark('a')}`);
        
        // click element.
        await element.click();
        await sleep(1000);
        await outputLog(funcName, `${element}: ${getStrRepeatedToMark('b')}`);
    };
    scrollDisplayToTargetXpath = async(driver, xpath) => {
        const funcName = 'scrollDisplayToTargetXpath';
        // scroll in the window.
        let element = await driver.findElement(By.xpath(xpath));
        await driver.executeScript("arguments[0].scrollIntoView()", element);
        await sleep(1000);
        await outputLog(funcName, `${element}: ${getStrRepeatedToMark('a')}`);
    }
};
class Photographer{
    captureSingle = async(driver, backlogId, testCaseName, number=1, isOverwriting=false, evidenceFolderName='02.テスト項目・エビデンス') => {
        const funcName = 'captureSingle';
        const prefix = 'screenshot';
        const gofer = new Gofer();
        const folderToSave = path.join('.', `${backlogId}`, `${evidenceFolderName}`, `${testCaseName}`);
        const fileToSave   = path.join(folderToSave, `${prefix}-${gofer.getStrByZeroPadding(number)}.jpg`);
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('a')}`);
        const base64 = await driver.takeScreenshot();
        const buffer = Buffer.from(base64, 'base64');
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('b')}: ${folderToSave}`);
        if(fs.existsSync(folderToSave)){
            await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('c')}: ${folderToSave} already exists.`);
            if (isOverwriting == true){
                await fs.writeFileSync(fileToSave, buffer);
            }
            return 1;
        }
        await fsp.mkdir(folderToSave, { recursive: true })
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('d')}: ${fileToSave}`);
        await fs.writeFileSync(fileToSave, buffer);
    };

    // このメソッドは使えない。
    caputureWholeWindowByScreenHeight = async(driver, backlogId, testCaseName, number=1, isOverwriting=false, evidenceFolderName='02.テスト項目・エビデンス') => {
        const funcName = 'caputureWholeWindowByScreenHeight';
        
        const folderToSave = path.join('.', `${backlogId}`, `${evidenceFolderName}`, `${testCaseName}`);
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('a')}: ${folderToSave}`);
        
        // 対象のフォルダがある場合、キャプチャの保存は行わず抜ける。
        if(fs.existsSync(folderToSave)){
            await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('b')}: ${folderToSave} already exists.`);
            return 1;
        }
        
        const scrollWidth  = await driver.executeScript("return document.body.scrollWidth");
        const scrollHeight = await driver.executeScript("return document.body.scrollHeight");
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('c')}: "scrollWidth" is ${[scrollWidth]}`);
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('d')}: "scrollHeight" is ${[scrollHeight]}`);
        const xCoord = 0;
        const yCoord = scrollHeight;
        const prefix = 'screenshot';
        let fileToSave;

        await fsp.mkdir(folderToSave, { recursive: true });
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('e')}`);
        const gofer = new Gofer();
        for (let i = 0; i < 5; i++){
            let base64 = await driver.takeScreenshot();
            let buffer = Buffer.from(base64, 'base64');
            await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('f')}: ${i}: ${[yCoord * i]}`);
            fileToSave = path.join(folderToSave, `${prefix}-${gofer.getStrByZeroPadding(i + number)}.jpg`);
            await fs.writeFileSync(fileToSave, buffer);
            await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('f')}: ${i}: query is "window.scrollTo(${xCoord}, ${yCoord * i})"`);
            let queryDeepCopied = _.cloneDeep(`window.scrollTo(${xCoord}, ${yCoord * i})`)
            await driver.executeScript(queryDeepCopied);
            await sleep(1000);
        }
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('g')}: ${fileToSave}`);
    };

    // このメソッドは使える。
    caputureWholeWindowByXpath = async(driver, backlogId, testCaseName, xpathArray, number=1, isOverwriting=false, evidenceFolderName='02.テスト項目・エビデンス') => {
        const funcName = 'caputureWholeWindowByXpath';
        
        const folderToSave = path.join('.', `${backlogId}`, `${evidenceFolderName}`, `${testCaseName}`);
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('a')}: ${folderToSave}`);
        
        // 対象のフォルダがある場合、キャプチャの保存は行わず抜ける。
        if(fs.existsSync(folderToSave)){
            await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('b')}: ${folderToSave} already exists.`);
            return 1;
        }
        
        const prefix = 'screenshot';
        let fileToSave;

        await fsp.mkdir(folderToSave, { recursive: true });
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('e')}`);
        for (let i = 0; i < xpathArray.length; i++){

            let element = await driver.findElement(By.xpath(xpathArray[i]));
            await driver.executeScript("arguments[0].scrollIntoView()", element);
            await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('f')}: ${i}: ${xpathArray[i]}`);

            const gofer = new Gofer();
            let base64 = await driver.takeScreenshot();
            let buffer = Buffer.from(base64, 'base64');
            fileToSave = path.join(folderToSave, `${prefix}-${gofer.getStrByZeroPadding(i + number)}.jpg`);
            await fs.writeFileSync(fileToSave, buffer);
            await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('f')}: ${i}: ${fileToSave}`);
            await sleep(1000);
            
        }
        await outputLog(funcName, `${testCaseName}: ${getStrRepeatedToMark('g')}: ${fileToSave}`);
    };

    // これは使えない。（動きが不正確。）
    scrollAndCaptureDisplayKohochiIchiranDatagrid = async(driver, indexOfTargetItemInArray, backlogId, testCaseName, isOverwriting=false, evidenceFolderName='02.テスト項目・エビデンス') => {
        const funcName = 'scrollDisplayInKohochiIchiran';
        const lastItemsPosition = 11;
        const repeatingTimesScroll = indexOfTargetItemInArray - lastItemsPosition + 1;
        let   caputuredCount = 0;
        // scroll in the window.
        for(let i = 0; i < repeatingTimesScroll; i++){
            for(let j = 0; j < 2+1; j++){
                // ヘッダーをスクロール。
                await driver.executeScript(`document.getElementsByClassName(\"wj-cell wj-header wj-align-left wj-filter-off\")[${i+j}].scrollIntoView();`);
                // データ部をスクロール。
                await driver.executeScript(`document.getElementsByClassName(\"wj-cell wj-align-left\")[${i+j}].scrollIntoView();`);
                await sleep(100);
            }
            // スクショ
            if(i % (lastItemsPosition - 2) === 0 || i === repeatingTimesScroll - 1){
                caputuredCount++;
                await self.captureSingle(driver, backlogId, testCaseName, caputuredCount, isOverwriting, evidenceFolderName);
                await outputLog(funcName, `${i}: ${getStrRepeatedToMark('a')}`);
            }
        }
        await outputLog(funcName, `${getStrRepeatedToMark('b')}`);
    }
};

// コーディング用ツール
class Inspector{
    // これは使えない。
    getPseudoStylesByClassName = async(driver, className, isAfter=true) => {
        const funcName = 'getPseudoElementsByClassName';
        let afterOrBefore;
        if(isAfter === true){
            afterOrBefore = ':after';
        }else{
            afterOrBefore = ':before';
        }
        let styles = await driver.executeScript(`const elements = document.querySelectorAll(\"${className}\"); let styles = []; for(let i = 0; i < elements.length; i++){styles.push(window.getComputedStyle(elements[i], \"${afterOrBefore}\"));}; return styles;`);
        await outputLog(funcName, `${getStrRepeatedToMark('a')}`);
        return new Promise( resolve => resolve(styles) );
    }
    // これは使える。
    getPseudoElementsContentsByClassName = async(driver, className, isAfter=true) => {
        const funcName = 'getPseudoElementsContentsByClassName';
        let afterOrBefore;
        if(isAfter === true){
            afterOrBefore = ':after';
        }else{
            afterOrBefore = ':before';
        }
        const elements = await driver.executeScript(`return document.querySelectorAll(\"${className}\")`);
        let contents = await driver.executeScript(`const elements = document.querySelectorAll(\"${className}\"); let contents = []; for(let i = 0; i < elements.length; i++){contents.push(window.getComputedStyle(elements[i], \"${afterOrBefore}\").content);}; return contents;`);
        await outputLog(funcName, `${getStrRepeatedToMark('a')}`);
        return new Promise( resolve => resolve(contents) );
    }
    getXpathsByClassName = async(driver, className) => {
        const funcName = 'getElementsByClassName';
        let   elements = [];
        let   xpath    = '';
        let   xpaths   = [];
        const scriptFileName = 'lib/getXpathByElement.js';
        let script  = await getTextLines(scriptFileName).join('\t');
        let scripts = await script.toString().split('\"scriptSeparator\"');
        await outputLog(funcName, `${getStrRepeatedToMark('a')}`);
        elements = await driver.findElements(By.className(className));
        await outputLog(funcName, `${getStrRepeatedToMark('b')}`);
        console.log(elements.length);
        for (let i = 0; i < elements.length; i++){
            await outputLog(funcName, `${i}: ${getStrRepeatedToMark('c')}`);
            xpath = await driver.executeScript(`${scripts[0]}${i}${scripts[1]}`);
            await outputLog(funcName, `${i}: ${getStrRepeatedToMark('d')}`);
            xpaths.push(_.cloneDeep(xpath));
        }
        return new Promise( resolve => resolve(xpaths) );
    };
    getElementByXpath = async(driver, xpath) => {
        const funcName = 'getElementByXpath';
        await outputLog(funcName, `${xpath}: ${getStrRepeatedToMark('a')}`);
        const element = await driver.findElement(By.xpath(xpath));
        const stringElement = await _.cloneDeep(element)
        await outputLog(funcName, `${stringElement}: ${getStrRepeatedToMark('b')}`);
        return new Promise( resolve => resolve(element) );
    };
    getElementsByClassName = async(driver, className) => {
        const funcName = 'getElementsByClassName';
        let text = '';
        const texts = [];
        let elements = [];
        elements = await driver.findElements(By.className(className));
        return new Promise( resolve => resolve(elements) );
    };
    getTextsByIdArray = async(driver, idArray) => {
        const funcName = 'getTextsByIdArray';
        let element;
        let text = '';
        let texts = [];
        for (let i = 0; i < idArray.length; i++) {
            await outputLog(funcName, `${i}: ${idArray[i]}: ${getStrRepeatedToMark('a')}`);
            element = await driver.findElement(By.id(idArray[i]));
            await outputLog(funcName, `${i}: ${idArray[i]}: ${getStrRepeatedToMark('b')}`);
            text = await element.getText();
            await outputLog(funcName, `${i}: ${idArray[i]}: ${getStrRepeatedToMark('c')}`);
            texts.push(_.cloneDeep(text));
        }
        return new Promise( resolve => resolve(texts) );
    }
    getTextByXpath = async(driver, xpath) => {
        const funcName = 'getTextByXpath';
        await outputLog(funcName, `${xpath}: ${getStrRepeatedToMark('a')}`);
        const element = await driver.findElement(By.xpath(xpath));
        const stringElement = await _.cloneDeep(element);
        await outputLog(funcName, `${stringElement}: ${getStrRepeatedToMark('b')}`);
        const text = await element.getText();
        const stringText = await _.cloneDeep(text);
        await outputLog(funcName, `${stringText}: ${getStrRepeatedToMark('c')}`);
        return new Promise( resolve => resolve(stringText) );
    }
    getTextsByXpathArray = async(driver, xpathArray) => {
        const funcName = 'getTextsByXpathArray';
        let element;
        let text = '';
        let texts = [];
        for (let i = 0; i < xpathArray.length; i++) {
            await outputLog(funcName, `${i}: ${xpathArray[i]}: ${getStrRepeatedToMark('a')}`);
            element = await driver.findElement(By.xpath(xpathArray[i]));
            await outputLog(funcName, `${i}: ${xpathArray[i]}: ${getStrRepeatedToMark('b')}`);
            text = await element.getText();
            await outputLog(funcName, `${i}: ${xpathArray[i]}: ${getStrRepeatedToMark('c')}`);
            texts.push(_.cloneDeep(text));
        }
        return new Promise( resolve => resolve(texts) );
    }
    getTextsByClassName = async(driver, className) => {
        const funcName = 'getTextsByClassName';
        let text = '';
        const texts = [];
        let elements = [];
        elements = await driver.findElements(By.className(className));
        for (let i = 0; i < elements.length; i++){
            await outputLog(funcName, `${i}: ${elements[i]}: ${getStrRepeatedToMark('a')}`);
            text = await elements[i].getText();
            await outputLog(funcName, `${i}: ${elements[i]}: ${getStrRepeatedToMark('b')}`);
            texts.push(_.cloneDeep(text));
        }
        return new Promise( resolve => resolve(texts) );
    };
    getIdsByClassName = async(driver, className) => {
        const funcName = 'getIdsByClassName';
        let id = '';
        const ids   = [];
        let elements = [];
        elements = await driver.findElements(By.className(className));
        for (let i = 0; i < elements.length; i++){
            await outputLog(funcName, `${i}: ${elements[i]}: ${getStrRepeatedToMark('a')}`);
            id = await elements[i].getAttribute("id");
            await outputLog(funcName, `${i}: ${elements[i]}: ${getStrRepeatedToMark('b')}: ${id}`);
            ids.push(_.cloneDeep(id));
        }
        return new Promise( resolve => resolve(ids) );
    };
    // 使い方の例
    // const idArray   = await inspector.getIdsByCss(driver, 'div', 'dividers full-width');
    getIdsByCss = async(driver, tagName, className) => {
        const funcName = 'getIdsByCss';
        let id = '';
        const ids   = [];
        let elements = [];
        let formatedClassName = className.replace(/ /g, '.')
        elements = await driver.findElements(By.css(`${tagName}.${formatedClassName}`));
        for (let i = 0; i < elements.length; i++){
            await outputLog(funcName, `${i}: ${elements[i]}: ${getStrRepeatedToMark('a')}`);
            id = await elements[i].getAttribute("id");
            await outputLog(funcName, `${i}: ${elements[i]}: ${getStrRepeatedToMark('b')}`);
            ids.push(_.cloneDeep(id));
        }
        return new Promise( resolve => resolve(ids) );
    };
}

// その他ツール
class Gofer{
    returnFormatOfArray = (array) => {
        let formatedArray = [];
        formatedArray = util.inspect(array, { maxArrayLength: null });
        // console.log("-----------------\n" + formatedArray + "\n-----------------\n")
        formatedArray = formatedArray.replace(/\n  /g, '').replace(/'閉じる\n表示項目選択'/g, '');
        return formatedArray;
    };
    getStrByZeroPadding = (number, numberOfDigit=4) => {
        return (getStrRepeatedToMark('0', numberOfDigit) + number).slice(-(numberOfDigit));
    };
}


// Export
module.exports = {sleep,
                assertEqual_and_log,
                outputLog,
                getStrRepeatedToMark,
                Operator,
                Inspector,
                Photographer,
                Gofer
};
