// node_module内モジュール
const { Builder, By, until } = require('selenium-webdriver');
const fs = require("fs");

// ローカルモジュール
const { sleep, assertEqual_and_log, outputLog, getStrRepeatedToMark, Operator, Inspector, Photographer, Gofer } = require("./lib/lib-methods.js");
const { KouhochiShosai, KouhochiIchiran, KouhochibetsuShinchoku } = require("./lib/lib-variables.js");
const { it } = require('mocha');

// グローバル変数定義 from ローカルモジュール
const kouhochiIchiran = new KouhochiIchiran();

// グローバル変数定義
let driver;
let backlogId = '';
let testCaseName = '';

describe("候補地一覧画面テスト", () => {
    before(() => {
        driver = new Builder().forBrowser("chrome").build();
    });

    after(() => {
        return driver.quit();
    });

    it(`${'なし（基本動作確認）'}: ${'01_正常系_表示_ページタイトル'}`, async () => {
        backlogId = 'なし（基本動作確認）';
        testCaseName = '01_正常系_表示_ページタイトル';
        const operator     = new Operator();
        const photographer = new Photographer();
        await operator.openAppViaO365(driver, kouhochiIchiran.target_url_accept, kouhochiIchiran.username_accept, kouhochiIchiran.password_accept, 40000);

        const title = await driver.getTitle();
        assertEqual_and_log('01', title, "候補地一覧・既存店一覧");

        const h1 = await driver.findElement(By.css("h1")).getText()
        assertEqual_and_log('02', h1, "候補地一覧");

        await photographer.captureSingle(driver, backlogId, testCaseName, 1, false);
    });

    it(`${"RSYS_SMARTSR_PRODUCTION-436"}: ${'02_正常系_表示_保存ボタン'}`, async () => {
        backlogId = "RSYS_SMARTSR_PRODUCTION-436";
        testCaseName = '02_正常系_表示_保存ボタン';
        const operator     = new Operator();
        const inspector    = new Inspector();
        const photographer = new Photographer();

        let xpathArray = ['//*[@id="editbtn"]'];
        await operator.clickElementsByXpathArray(driver, xpathArray);
        await sleep(5000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);

        xpath = '//*[@id="confirmbtn"]';
        const text = await inspector.getTextByXpath(driver, xpath);
        assertEqual_and_log('01', text, "保存");
        await photographer.captureSingle(driver, backlogId, testCaseName, 1, false);
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);

        xpathArray = ['//*[@id="cancelbtn"]'];
        await operator.clickElementsByXpathArray(driver, xpathArray);
        await sleep(2000);
        await photographer.captureSingle(driver, backlogId, testCaseName, 2, false);
        await outputLog(testCaseName, `${getStrRepeatedToMark('c')}`);
    });

    it(`${"RSYS_SMARTSR_PRODUCTION-334"}: ${'03_正常系_表示_絞り込みポップアップ'}`, async () => {
        backlogId = "RSYS_SMARTSR_PRODUCTION-334";
        testCaseName = '03_正常系_表示_絞り込みポップアップ';
        const operator     = new Operator();
        const inspector    = new Inspector();
        const photographer = new Photographer(); 
        const gofer        = new Gofer();

        let xpath = '//*[@id="dispItemsbtn2"]';
        await operator.clickElementByXpath(driver, xpath);
        await sleep(2000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);

        let xpathArray = ['//*[@id="BorderContainer20"]/div[15]/label[2]',
                        '//*[@id="BorderContainer20"]/div[50]/label[2]',
                        '//*[@id="BorderContainer20"]/div[50]/label[3]'];
        let texts = await inspector.getTextsByXpathArray(driver, xpathArray);
        let exepectedTexts = ['契約時遵守事項成就完了',
                            '建物登記・抵当権設定',
                            '着工後遵守事項成就完了'];
        for (let i = 0; i < exepectedTexts.length; i++){
            await operator.scrollDisplayToTargetXpath(driver, xpathArray[i]);
            assertEqual_and_log(`${gofer.getStrByZeroPadding(i+1, 2)}`, texts[i], exepectedTexts[i]);
            await photographer.captureSingle(driver, backlogId, testCaseName, 1, false);
        }
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);
    });

    it(`${"RSYS_SMARTSR_PRODUCTION-334"}: ${'04_正常系_非表示_絞り込みポップアップ'}`, async () => {
        backlogId = "RSYS_SMARTSR_PRODUCTION-334";
        testCaseName = '04_正常系_非表示_絞り込みポップアップ';
        const operator     = new Operator();
        const inspector    = new Inspector();
        const photographer = new Photographer(); 
        const gofer        = new Gofer();

        let displayedTexts = await inspector.getTextsByClassName(driver, 'label OSInline');
        displayedTexts.push(...(await inspector.getTextsByClassName(driver, 'absolute-bottom OSInline')));
        await outputLog(testCaseName, `${getStrRepeatedToMark('c')}`);
        await outputLog(testCaseName, `${getStrRepeatedToMark('c')}: ${displayedTexts.length}`);
        await outputLog(testCaseName, gofer.returnFormatOfArray(displayedTexts));
        let unexepectedTexts = ['新規契約_遵守事項登録',
                            '新規契約_停止条件登録',
                            '着工前停止条件完了',
                            '設計契約前遵守事項成就完了',
                            '賃貸借開始日前停止条件成就完了'];
        for (let i = 0; i < unexepectedTexts.length; i++){
            assertEqual_and_log(`${gofer.getStrByZeroPadding(i+1, 2)}`, displayedTexts.includes(unexepectedTexts[i]), false);
            await outputLog(testCaseName, `${getStrRepeatedToMark('d')}`);
        }
        await photographer.captureSingle(driver, backlogId, testCaseName, 1, false);
        await outputLog(testCaseName, `${getStrRepeatedToMark('e')}`);

        await outputLog(testCaseName, gofer.returnFormatOfArray(displayedTexts));
        await outputLog(testCaseName, displayedTexts.length);
        await outputLog(testCaseName, `${getStrRepeatedToMark('f')}`);
    });

    // it(`${'なし（基本動作確認）'}: ${'05_正常系_表示_表示項目を全選択'}`, async () => {
    //     backlogId = 'なし（基本動作確認）';
    //     testCaseName = '05_正常系_表示_表示項目を全選択';
    //     const operator     = new Operator();
    //     const inspector    = new Inspector();
    //     const photographer = new Photographer(); 
    //     const gofer        = new Gofer();

    //     await operator.clickElementsByIdArray(driver, ['RadioButton5-input']);
    //     await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`); 
        
    //     let checkboxIds = await inspector.getIdsByClassName(driver, 'checkbox');
    //     await outputLog(testCaseName, gofer.returnFormatOfArray(checkboxIds));
    //     await outputLog(testCaseName, checkboxIds.length);
    //     await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);
        
    //     let contentsCheckboxAfter = await inspector.getPseudoElementsContentsByClassName(driver, '.checkbox', true);
    //     await outputLog(testCaseName, gofer.returnFormatOfArray(contentsCheckboxAfter));
    //     await outputLog(testCaseName, `${getStrRepeatedToMark('c')}`);

    //     let idArrayAfterIsNone = [];
    //     for(let i = 0; i < contentsCheckboxAfter.length; i++){
    //         if(contentsCheckboxAfter[i] === 'none'){
    //             idArrayAfterIsNone.push(checkboxIds[i]);
    //         }
    //     }
    //     await operator.clickElementsByIdArray(driver, idArrayAfterIsNone, 300);
    //     await outputLog(testCaseName, `${getStrRepeatedToMark('d')}`);
        
    //     await photographer.captureSingle(driver, backlogId, testCaseName, 1, true);

    //     await operator.clickElementsByIdArray(driver, ['setMylist'], 1500);
    //     await outputLog(testCaseName, `${getStrRepeatedToMark('e')}`);
    // });

    it(`${'なし（基本動作確認）'}: ${'06_正常系_表示_表示項目を全選択（こっちで良かった・・・）'}`, async () => {
        backlogId = 'なし（基本動作確認）';
        testCaseName = '06_正常系_表示_表示項目を全選択（こっちで良かった・・・）';
        const operator     = new Operator();
        const inspector    = new Inspector();
        const photographer = new Photographer(); 
        const gofer        = new Gofer();

        await operator.clickElementsByIdArray(driver, ['RadioButton5-input']);
        await sleep(2000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);

        await operator.clickElementsByXpathArray(driver, ['//*[@id="DisplayItemPop"]/div/div[1]/div[4]/div[1]/button']);
        await sleep(2000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);
        
        await photographer.captureSingle(driver, backlogId, testCaseName, 1, true);

        // await operator.clickElementsByIdArray(driver, ['setMylist'], 1500);
        // await outputLog(testCaseName, `${getStrRepeatedToMark('e')}`);
    });
    
    it(`${'なし（基本動作確認）'}: ${'07_正常系_表示_表示項目を全解除'}`, async () => {
        backlogId = 'なし（基本動作確認）';
        testCaseName = '07_正常系_表示_表示項目を全解除';
        const operator     = new Operator();
        const inspector    = new Inspector();
        const photographer = new Photographer(); 
        const gofer        = new Gofer();

        await operator.clickElementsByIdArray(driver, ['RadioButton5-input']);
        await sleep(2000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);

        await operator.clickElementsByXpathArray(driver, ['//*[@id="DisplayItemPop"]/div/div[1]/div[4]/div[2]/button']);
        await sleep(2000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);
        
        await photographer.captureSingle(driver, backlogId, testCaseName, 1, true);

        // await operator.clickElementsByIdArray(driver, ['setMylist'], 1500);
        // await outputLog(testCaseName, `${getStrRepeatedToMark('e')}`);
    });

    it(`${'RSYS_SMARTSR_PRODUCTION-334'}: ${'08_正常系_選択_今回の追加項目'}`, async () => {
        backlogId = 'RSYS_SMARTSR_PRODUCTION-334';
        testCaseName = '08_正常系_選択_今回の追加項目';
        const operator     = new Operator();
        const inspector    = new Inspector();
        const photographer = new Photographer(); 
        const gofer        = new Gofer();
        
        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);

        xpathArray = ['//*[@id="Checkbox267"]',
                    '//*[@id="Checkbox419"]',
                    '//*[@id="Checkbox420"]'];
        await operator.clickElementsByXpathArray(driver, xpathArray);
        await photographer.caputureWholeWindowByXpath(driver, backlogId, testCaseName, xpathArray, 1, false);
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);

        // await operator.clickElementsByIdArray(driver, ['setMylist'], 1500);
        // await outputLog(testCaseName, `${getStrRepeatedToMark('e')}`);
    });

    it(`${"なし（基本動作確認）"}: ${'09_正常系_XPath取得テスト'}`, async () => {
        backlogId = "なし（基本動作確認）";
        testCaseName = '09_正常系_表示_メイン画面Datagrid';
        const operator     = new Operator();
        const inspector    = new Inspector();
        const photographer = new Photographer(); 
        const gofer        = new Gofer();

        xpathArray = await inspector.getXpathsByClassName(driver, 'checkbox');
        await outputLog(testCaseName, gofer.returnFormatOfArray(xpathArray));
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);

        await operator.clickElementsByIdArray(driver, ['setMylist'], 1500);
        await outputLog(testCaseName, `${getStrRepeatedToMark('e')}`);

        await sleep(5000);
    });

    it(`${"RSYS_SMARTSR_PRODUCTION-334"}: ${'10_正常系_表示_メイン画面Datagrid'}`, async () => {
        backlogId = "RSYS_SMARTSR_PRODUCTION-334";
        testCaseName = '10_正常系_表示_メイン画面Datagrid';
        const operator     = new Operator();
        const inspector    = new Inspector();
        const photographer = new Photographer(); 
        const gofer        = new Gofer();

        let xpathArray = ['//*[@id="editbtn"]'];
        await operator.clickElementsByXpathArray(driver, xpathArray);
        await sleep(5000);
        await outputLog(testCaseName, `${getStrRepeatedToMark('a')}`);

        xpathArray = ['//*[@id="BorderContainer20"]/div[15]/label[2]',
                    '//*[@id="BorderContainer20"]/div[50]/label[2]',
                    '//*[@id="BorderContainer20"]/div[50]/label[3]'];
        await photographer.captureSingle(driver, backlogId, testCaseName, 1, false);
        await outputLog(testCaseName, `${getStrRepeatedToMark('b')}`);

        await sleep(5000);
    });

    it(`${"RSYS_SMARTSR_PRODUCTION-334"}: ${'11_正常系_非表示_メイン画面Datagrid'}`, async () => {
        backlogId = "RSYS_SMARTSR_PRODUCTION-334";
        testCaseName = '11_正常系_非表示_メイン画面Datagrid';
        
    });

    it(`${"RSYS_SMARTSR_PRODUCTION-334"}: ${'12_正常系_出力_CSV'}`, async () => {
        backlogId = "RSYS_SMARTSR_PRODUCTION-334";
        testCaseName = '12_正常系_出力_CSV';
        
    });
});

