// テスト対象
class TestTarget{
    constructor() {
        
    }
}

// 「候補地詳細用」画面変数
class KouhochiShosai{
    constructor() {
        this.username_dev      = '';
        this.password_dev      = '';
        this.target_url_dev    = '';
        this.username_accept   = '';
        this.password_accept   = '';
        this.target_url_accept = '';
        this.arrayXpathsAccordionsIn1stTab = ['//*[@id="b12-lbl"]',
                                            '//*[@id="b12-lblStaffInfoTitle"]',
                                            '//*[@id="b12-lbl4"]',
                                            '//*[@id="b12-lblPropSiteMngInfoTitle"]',
                                            '//*[@id="b12-lblOpenExplanationLastShopInfoTitle"]',
                                            '//*[@id="b12-lblContractConditionTitle"]',
                                            '//*[@id="b12-lblProfitsConditionTitle"]/span',
                                            '//*[@id="b12-lblBrokerageAndDevelopmentInfoTitle"]'
        ];
        this.arrayXpathsAccordionsIn3rdTab = [];
        this.arrayTextsAccordionsIn1stTab = ['基本情報',
                                            '担当者情報',
                                            '免許関連情報',
                                            '候補地管理情報',
                                            '出店説明先店舗',
                                            '契約条件',
                                            '収益条件',
                                            '仲介/開発業務委託情報'
        ];
        this.arrayXpathsToScrollToWholeCapture = ['//*[@id="b1-Title"]/span', 
                                                '//*[@id="b12-lblShopNo"]',
                                                '//*[@id="b12-lblHouseName_Kana"]',
                                                '//*[@id="b12-lblShopArea"]',
                                                '//*[@id="b12-lblBuildingCoverage"]',
                                                '//*[@id="b12-lblContractTypeClass"]',
                                                '//*[@id="b12-lblTasMapErea"]',
                                                '//*[@id="b12-lblStoreSubjectRelocation"]',
                                                '//*[@id="b12-lblBuildingSupplier"]',
                                                '//*[@id="b12-lblChargeRMCode"]',
                                                '//*[@id="b12-lblOpenChargeRMCode"]',
                                                '//*[@id="b12-lblCigaLicCondition"]',
                                                '//*[@id="b12-lblOpenPlansDate"]',
                                                '//*[@id="b12-lblAfterExplanationStatus"]',
                                                '//*[@id="b12-lblOpenExplanationLastShopInfoTitle"]',
                                                '//*[@id="b12-lblContractConditionTitle"]',
                                                '//*[@id="b12-lblTotalKeyMoney"]',
                                                '//*[@id="b12-lblOtherAmount"]',
                                                '//*[@id="b12-lblOperatingIncome2ndYear"]',
                                                '//*[@id="b12-lblProfitRate5thtYear"]',
                                                '//*[@id="b12-lblBreakEvenPoint1stYear"]',
                                                '//*[@id="b12-lblDevelopmentGyomuItakuTatal"]'
        ]
    };
    
}

// 「候補地一覧」画面用変数
class KouhochiIchiran{
    constructor() {
        this.username_dev      = '';
        this.password_dev      = '';
        this.target_url_dev    = '';
        this.username_accept   = '';
        this.password_accept   = '';
        this.target_url_accept = '';
    };
}

// 「候補地別進捗表示/編集」画面用変数
class KouhochibetsuShinchoku{
    constructor() {
        this.arrayXpathsStepButton = [];
        this.arrayXpathsItemLimitDate = [];
        this.arrayXpathsItemDate = [];
    };
}


// 「契約書新規作成」画面用変数
class ContractNewCreate{
    constructor() {
        this.arrayXpathsConditionSetting = ['//*[@id="b3-b1-AreaSelectDropdown2-container"]', // 地域
                                            '//*[@id="b3-b1-ContractTypeSelectDropdown2"]',   // 契約タイプ
                                            '//*[@id="b3-b1-FixedTermSelectDropdown2"]',  // 定借有無
                                            '//*[@id="b3-b1-DepositSelectDropdown2"]',    // 造成負担先
                                            '//*[@id="b3-b1-SubtenureSelectDropdown2"]',  // 敷金・保証金
                                            '//*[@id="b3-b1-MortgageSelectDropdown2"]',   // 転貸借有無
                                            '//*[@id="b3-b1-ReplottingSelectDropdown2"]' // 換地発生
        ];
        
    };
}

// Export
module.exports = {TestTarget,
                KouhochiShosai,
                KouhochiIchiran,
                KouhochibetsuShinchoku,
                ContractNewCreate
};
