describe('My First Test', function() {
    it('Tutorial', async function() {
        cy.visit('https://example.cypress.io/commands/actions#click')

        cy.get('.action-btn').click()

        // clicking in the center of the element is the default
        cy.get('#action-canvas').click()

        cy.get('#action-canvas').click('topLeft')
        cy.get('#action-canvas').click('top')
        cy.get('#action-canvas').click('topRight')
        cy.get('#action-canvas').click('left')
        cy.get('#action-canvas').click('right')
        cy.get('#action-canvas').click('bottomLeft')
        cy.get('#action-canvas').click('bottom')
        cy.get('#action-canvas').click('bottomRight')

        // .click() accepts a an x and y coordinate
        // that controls where the click occurs :)
        cy.get('#action-canvas')
        .click(80, 75)
        .click(170, 75)
        .click(80, 165)
        .click(100, 185)
        .click(125, 190)
        .click(150, 185)
        .click(170, 165)

        // click multiple elements by passing multiple: true
        cy.get('.action-labels>.label').click({ multiple: true })

        // Ignore error checking prior to clicking
        cy.get('.action-opacity>.btn').click({ force: true })
    })
})