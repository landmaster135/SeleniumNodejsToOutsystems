const email = '';

function pause(milisecond) {
    return new Promise(function(resolve) {
        setTimeout(function() {resolve(1*1)}, milisecond)
    })
}

describe('My First Test', function() {
    it('Office Login', async function() {
        // await enterSSO()

        // Instantly sign-in to personal account in the Office365 login view.
        cy.visit('https://www.office.com/?ref=logout')
        cy.get('#hero-banner-sign-in-to-office-365-link').click()

        // Sing-out from personal account in the Office365 home view.
        // await cy.visit('https://www.office.com/?auth=2')
        // await cy.get('#O365_HeaderRightRegion').click()
        // await cy.get('#mectrl_body_signOut').click()
        // await cy.get('.row.tile').first().click()

        // Sign-in to test account in the Office365 login view.

        // password input and sign-in
    })

    it('Office Logout', async function() {
        // もう分からん・・・！！　Start　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

        // Sing-out from personal account in the Office365 home view.
        cy.visit('https://www.office.com/?auth=2')
        // await pause(5000);

        // cy.get('._26VD_pe1GeiveQieoZ7ZgV').eq(0).click() // 表示された
        cy.get('#O365_MainLink_NavMenu').first().click()  // 表示された

        // cy.get('#O365_HeaderRightRegion').first().click({force: true}) // 表示されない
        // cy.get('._26VD_pe1GeiveQieoZ7ZgV').eq(2).click({force: true}) // 表示されない
        // cy.get('#O365_MainLink_Me').first().click({force: true}) // 表示されない
        // cy.get('._3Lb2vsW2ownHe7x4OC6xKn').first().click({force: true}) // 表示されない
        // cy.get('._3WqBR3fPzXEKltMjNYLDAj.undefined').first().click({force: true}) // 表示されない
        // cy.get('._2-4jfRBkDLE1Xuu-op_VA2._3a2rsMtCznztS3xhL4DybP').first().click({force: true}) // 表示されない

        // cy.get('#O365_MainLink_MePhoto').first().click({force: true}) // 表示されない
        // cy.get('._26VD_pe1GeiveQieoZ7ZgV').eq(3).click() // 表示されない
        // cy.get('._26VD_pe1GeiveQieoZ7ZgV').eq(3).click('left') // 表示されない
        // cy.get('._26VD_pe1GeiveQieoZ7ZgV').eq(3).click({force: true}) // 表示されない
        // cy.get('._26VD_pe1GeiveQieoZ7ZgV').eq(3).click('left', {force: true}) // 表示されない
        // cy.get('.O365_MainLink_Signin').first().click({force: true}) // getできない
        // cy.get('.O365_MainLink_Signin').first().click() // getできない

        // cy.get('._3OFPOuvhHOYjd1fO_g_ymI').first().click({force: true}) // 表示されない
        // cy.get('.W3SxI5cuS3WM1UXD8WZsU').first().click({force: true}) // 表示されない
        // cy.get('#meInitialsButton').first().click({force: true}) // 表示されない
        // cy.get('._2KqWkae0FcyhdNhWQ-Cp-M').first().click({force: true}) // 表示されない


        // cy.get('#O365_UniversalMeContainer').first().click()
        // cy.get('#mectrl_main_trigger').first().click({force: true})

        // Popup from O365_HeaderRightRegion
        // cy.get('#mectrl_body_signOut').first().click()
        // cy.get('.row.tile').first().click()

        // もう分からん・・・！！　End　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー


        // Sing-out from personal account in the Office365 home view.
        // await cy.visit('https://www.office.com/?auth=2')
        // await cy.get('#O365_HeaderRightRegion').click()
        // await cy.get('#mectrl_body_signOut').click()
        // await cy.get('.row.tile').first().click()

        // Sign-in to test account in the Office365 login view.

        // password input and sign-in
    })

    it('Delete history', function() {
        // Delete history.
        // cy.visit('chrome://settings/clearBrowserData')
        // cy.get('#clearBrowsingDataConfirm').click()

        // Instantly display the Office365 login view.
        cy.visit('https://www.office.com/?ref=logout')

        // clear cookies and caches
        // cy.clearCookies()

    })

    // it('Visit OutSystems', async function() {
    //     // await enterSSO()
    //     await cy.visit('')

    //     // cy.get('.gsfi.lst-d-f')
    //     // .type('cypress.io')
    //     cy.get('#dispItemsbtn2')
    //     .click()
    //     cy.get('RadioButton5-input').click()

    //     // select 敷地面積（Rビュー上）(㎡)
    //     cy.get('#Checkbox63').click()

    //     // click 閉じる
    //     cy.get('.btn.ThemeGrid_Width2.ThemeGrid_MarginGutter').click()

    //     // start editing
    //     cy.get('#editbtn').click()

    //     // cy.contains('Google 検索')
    //     // .click()

    //     // check input inactive
    //     // 敷地面積（Rビュー上）(㎡)
    //     cy.get('.wj-cell').eq(4).should('have.aria-readonly', 'true')

    // })
})
