const caracteres50 = "Lorem ipsum dolor sit amet, consectetur adipiscin."
const caracteres200 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra nisl et egestas pulvinar. Cras ultrices, tellus id lacinia vehicula, libero leo sollicitudin turpis, vitae ornare lorem nulla in."
const caracteres100 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra nisl et egestas pulvinar. Cr."

const frase = "The quick brown fox jumps over the lazy dog and tragically dies."



describe('Senioridade - Pesquisar e Editar', () => {

    beforeEach('Entrar na Página de Senioridade', () => {
      cy.visit('/')
      cy.get('.ci-settings')
        .click()
      cy.get('.sub-menu > :nth-child(12)')  
        .click()
    })
  
    it('TC001 - Teste tela adicionar', () => {
      cy.get('.secondary')
        .click()
      cy.get('.chore > span')
        .should('contain', "Cadastro de senioridade")
  
    })
  
    it('TC002 - Teste Filtro Senioridade (Campo Alfanumérico)', () => {
      cy.get('.ng-pristine')
        .type(frase)
      cy.get('.row > .actions > :nth-child(1)')
        .click()
      cy.wait(500)
      cy.get('.ng-valid')
        .should('have.value', frase)
    })
  
    it('TC003 - Teste Filtro Senioridade (Quantidade de Caracteres)', () => {
      cy.get('.ng-pristine')
        .type(frase)
      cy.get('.row > .actions > :nth-child(1)')
        .click()
      cy.get('.ng-valid')
        .should('not.have.value', "The quick brown fox jumps over the lazy dog and tr")
  
      cy.wait(500)
  
      cy.get('.actions > :nth-child(2)')
        .click()
    })
  
    it('TC004 - Teste Filtro Pesquisa (Correspondência de Pesquisa)', () => {
      cy.fazPesquisa('.ng-untouched', '.row > .actions > :nth-child(1)', frase)
    })
  
    it('TC005 - Teste Limpar Filtro Senioridade', () => {
      cy.get('.ng-pristine')
        .type(frase)
      cy.wait(1000)
      cy.get('.actions > :nth-child(2)')
        .click()
  
      cy.get('.ng-valid')
        .should('not.have.value', frase)
  
    })
  
    it('TC006 - Tela Editar Senioridade', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('.modal-body > :nth-child(1)')
        .should('contain', "Editar Senioridade")
  
      cy.get('.btn-primary')
        .should('be.visible')
      cy.get('.btn-text')
        .should('be.visible')
    })
  
    it('TC007 - Teste Editar Campo Alfanumérico com 50 Caracteres', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('#senioridadeInput')
        .clear()
      cy.get('#senioridadeInput')
        .type(frase)
      cy.get('#senioridadeInput')
        .should('not.have.value', frase)
    })

    it('TC008 - Teste Pop-Up de Erro ao Editar', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('#senioridadeInput')
        .clear()
      cy.get('#senioridadeInput')
        .type(frase)
      cy.get('#senioridadeInput')
        .should('not.have.value', frase)
      
      cy.get('.btn-primary')
        .click()

      cy.get('.swal2-popup')
        .should('contain', 'Já existe um registro com essa descrição.')

    })

    it('TC009 - Teste Pop-Up de Confirmação ao Editar', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('#senioridadeInput')
        .clear()
      cy.geraCodigoEm('#senioridadeInput')
      cy.get('#senioridadeInput')
        .should('not.have.value', frase)
      
      cy.get('.btn-primary')
        .click()

      cy.get('.swal2-popup')
        .should('contain', 'Registro alterado com sucesso.')

    })
  
    it('TC009 - Editar Senioridade Ativa Vinculada a Usuário', () => {
      //Não há senioridade viculado a usuário.
    })
  
    it('TC010 - Editar Senioridade Ativa Não Vinculada a Usuário', () => {
      cy.contains('Ativo')
        .parent()
        .within(() => {
          cy.get('.rounded-end > .text-gray')
            .click() // ajuste o seletor conforme necessário
          // Faça as verificações necessárias no campo ao lado do campo "Ativo"
        })
  
      cy.wait(1000)
  
      cy.get('.slider')
        .click()
      cy.get('#senioridadeInput').clear()
      cy.geraCodigoEm("#senioridadeInput")
      cy.get('.btn-primary')
        .click()
  
    })
  
    it('TC011 & TC012 - Editar Botão Toggle Ativo/Inativo', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('.slider')
        .click()
      // cy.get('#senioridadeInput').clear().type("Teste Case Edição de Botão Toggle Ativo/Inativo")
      cy.get('.btn-primary')
        .click()
  
      cy.wait(1000)
  
      cy.get("#swal2-html-container")
        .should('contain', "Registro alterado com sucesso.")
    })
  
    it('TC013 - Editar Botão Toggle Ativo/Inativo Mensagem de Erro', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('.slider')
        .click()
      cy.get('#senioridadeInput')
        .clear()
        .type("Teste Case Edição de Botão Toggle Ativo/Inativo")
      cy.get('.btn-primary')
        .click()
  
      cy.wait(1000)
  
      cy.get("#swal2-html-container")
        .should('contain', "Já existe um registro com essa descrição.")
    })
  
    it('TC014 - Botão Voltar de Edição de Senioridade', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('.btn-text')
        .click()
  
      cy.get("#swal2-html-container")
        .should('contain', "Os dados serão perdidos, deseja continuar?")
      cy.get('.swal2-cancel')
        .should('be.visible')
      cy.get('.swal2-confirm')
        .should('be.visible')
    })
  
    it('TC015 - "Sim" na Tela de Confirmação de Voltar', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('.btn-text')
        .click()
  
      cy.get("#swal2-html-container")
        .should('contain', "Os dados serão perdidos, deseja continuar?")
      cy.get('.swal2-confirm')
        .click()
      cy.get('.swal2-confirm')
        .should("not.be.visible")
    })
  
    it('TC016 - "Não" na Tela de Confirmação de Voltar', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('.btn-text')
        .click()
  
      cy.get("#swal2-html-container")
        .should('contain', "Os dados serão perdidos, deseja continuar?")
      cy.get('.swal2-cancel')
        .click()
      cy.get('.swal2-cancel')
        .should("not.be.visible")
      cy.get('.modal-body > :nth-child(1)')
        .should('contain', "Editar Senioridade")
    })
  
    it('TC017 - Editar Teste com Campo em Branco', () => {
      cy.get(':nth-child(1) > .rounded-end > .text-gray')
        .click()
      cy.get('#senioridadeInput')
        .clear()
      cy.get('.btn-primary')
        .click()
  
      cy.get(':nth-child(3) > .text-danger')
        .should('contain', "O campo Senioridade não pode estar vazio!")
    })
  
  
  })