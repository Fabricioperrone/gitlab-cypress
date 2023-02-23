describe('Issue board', () => {
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.sessionLogin()
  })

  it('shows an open issue on the issue board, closes it, and shows it closed', () => {
    cy.api_createIssue().then(issue => {
      cy.api_getAllProjects().then(({ body }) => {
        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/-/boards`)

        cy.contains('[data-board-type="backlog"] [data-qa-selector="board_card"]', issue.body.title)
          .should('be.visible')

        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/issues/${issue.body.iid}`)
        cy.get('.d-none.btn-close').click()

        cy.visit(`${Cypress.env('user_name')}/${body[0].name}/-/boards`)

        cy.contains('[data-board-type="closed"] [data-qa-selector="board_card"]', issue.body.title)
          .should('be.visible')
      })
    })
  })
})
