// node_module内モジュール
const { Builder, By, until } = require('selenium-webdriver');
const fs = require("fs");

// ローカルモジュール
const { sleep, assertEqual_and_log, outputLog, getStrRepeatedToMark, Operator, Inspector, Photographer, Gofer } = require("./lib/lib-methods.js");
const { KouhochiShosai, KouhochiIchiran, KouhochibetsuShinchoku } = require("./lib/lib-variables.js");

// グローバル変数定義 from ローカルモジュール
const kouhochiShosai = new KouhochiShosai();
const arrayXpathsAccordionsIn1stTab = kouhochiShosai.arrayXpathsAccordionsIn1stTab;
const arrayTextsAccordionsIn1stTab = kouhochiShosai.arrayTextsAccordionsIn1stTab;
const arrayXpathsToScrollToWholeCapture = kouhochiShosai.arrayXpathsToScrollToWholeCapture;

// グローバル変数定義
let driver;
let backlogId = '';
let testCaseName = '';

describe(backlogId, () => {
    before(() => {
        driver = new Builder().forBrowser("chrome").setChromeOptions(['--headless','--disable-gpu',]).build();
    });

    after(() => {
        return driver.quit();
    });

    it(`${'なし（基本動作確認）'}: ${'00_正常系_表示_ページタイトル'}`, async () => {
        backlogId = 'なし（基本動作確認）';
        testCaseName = '00_正常系_表示_ページタイトル';
        const operator = new Operator();
        await operator.openAppDev(driver, kouhochiShosai.target_url_dev, kouhochiShosai.username_dev, kouhochiShosai.password_dev, 30000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);
    });

    it(`${'なし（基本動作確認）'}: ${'01_正常系_表示_ページタイトル'}`, async () => {
        backlogId = 'なし（基本動作確認）';
        testCaseName = '01_正常系_表示_ページタイトル';
        const operator = new Operator();
        await operator.openAppViaO365(driver, kouhochiShosai.target_url_accept, kouhochiShosai.username_accept, kouhochiShosai.password_accept, 30000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);

        const title = await driver.getTitle();
        assertEqual_and_log('01', title, "候補地詳細・既存店詳細");
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);

        // スクリーンショット取得（現在の表示部分のみ）
        const photographer = new Photographer();
        await photographer.captureSingle(driver, backlogId, testCaseName, true);
        await outputLog(testCaseName, `${getStrRepeatedToMark('c')}`);
    });


    it(`${'なし（基本動作確認）'}: ${'02_正常系_表示_ページ全体'}`, async () => {
        backlogId = 'なし（基本動作確認）';
        testCaseName = '02_正常系_表示_ページ全体';
        const operator = new Operator();

        // 候補地詳細画面のアコーディオンを全て開く
        const inspector = new Inspector();
        let xpathArray = arrayXpathsAccordionsIn1stTab;
        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);
        await operator.clickElementsByXpathArray(driver, xpathArray);
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);

        await operator.scrollDisplayToTargetXpath(driver, xpathArray[0]);

        const texts = await inspector.getTextsByXpathArray(driver, xpathArray);
        await outputLog(testCaseName, `${getStrRepeatedToMark('c')}`);
        for (let i = 0; i < arrayTextsAccordionsIn1stTab.length; i++){
            assertEqual_and_log('01', texts[i], arrayTextsAccordionsIn1stTab[i]);
        }
        await outputLog(testCaseName, `${getStrRepeatedToMark('d')}`);

        // スクリーンショット取得（画面全体）
        xpathArray = arrayXpathsToScrollToWholeCapture;
        const photographer = new Photographer();
        await photographer.caputureWholeWindowByXpath(driver, backlogId, testCaseName, xpathArray);
        await outputLog(testCaseName, `${getStrRepeatedToMark('e')}`);
    });

    it(`${"RSYS_SMARTSR_PRODUCTION-437"}: ${'03_正常系_表示_ページ全体'}`, async () => {
        backlogId = "RSYS_SMARTSR_PRODUCTION-437";
        testCaseName = '03_正常系_表示_ページ全体';
        const buttonText = await driver.findElement(By.css("button.btn.RMMG02-00_Button_02.FooterButton_Phone.ThemeGrid_MarginGutter")).getText();
        assertEqual_and_log('01', buttonText, "保存");

        // スクリーンショット取得（現在の表示部分のみ）
        const photographer = new Photographer();
        await photographer.captureSingle(driver, backlogId, testCaseName, true);
    });

    it(`${"RSYS_NEXT_STEP1_1_UAT-255"}: ${'04_面積合計(賃借面積)の値の確認'}`, async () => {
        backlogId = "RSYS_NEXT_STEP1_1_UAT-255";
        testCaseName = '04_面積合計(賃借面積)の値の確認';

        const operator = new Operator();
        const url = "";
        await operator.openAppDirect(driver, url, 30000);

        // 候補地詳細画面のアコーディオンを全て開く
        const inspector  = new Inspector();
        let   xpathArray = arrayXpathsAccordionsIn1stTab;
        await operator.clickElementsByXpathArray(driver, xpathArray);

        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);

        await sleep(1000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);

        const xpathTarget = '//*[@id="b12-txtLayoutAreaBlueprint"]';
        await operator.scrollDisplayToTargetXpath(driver, xpathTarget);
        await sleep(1000);
        const text = await inspector.getTextByXpath(driver, xpathTarget);
        await outputLog(testCaseName, `${getStrRepeatedToMark('c')}`);
        assertEqual_and_log('01', Number(text) >= 0, true);

        // スクリーンショット取得（現在の表示部分のみ）
        const photographer = new Photographer();
        await photographer.captureSingle(driver, backlogId, testCaseName, true);
        await outputLog(testCaseName, `${getStrRepeatedToMark('d')}`);
    });
});
