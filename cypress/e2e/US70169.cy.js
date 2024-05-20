const { exit } = require("process")

const caracteres50 = "Lorem ipsum dolor sit amet, consectetur adipiscin."
const caracteres200 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra nisl et egestas pulvinar. Cras ultrices, tellus id lacinia vehicula, libero leo sollicitudin turpis, vitae ornare lorem nulla in."
const caracteres100 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra nisl et egestas pulvinar. Cra"

const frase = "The quick brown fox jumps over the lazy dog and tragically dies."

/// <reference types="Cypress" />

function getTodayDate(days = 0) {
  const today = new Date();
  today.setDate(today.getDate() + days);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('pt-BR', options);

  return formattedDate;
}

describe('Template de Email - Pesquisar', () => {
  
  beforeEach('Entrar no Template de Email', () => {
    cy.visit('/')
    cy.get('.ci-settings')
      .click()
    cy.get('.sub-menu > :nth-child(13)')
      .click()
  })


  it('TC001 - Teste Front', () => {
    //título "Templates de e-mail"
    cy.get('.form-wrapper > :nth-child(1) > :nth-child(1) > h3')
      .should('contain', 'Templates de e-mail')
      .and('be.visible')

    //campo de texto "Template de Email"
    cy.get('.grow > .ng-untouched')
      .should('be.visible')

    //area de filtro
    cy.get('.cluster-filter-select')
      .should('be.visible')

    //botão "limpar filtros"
    cy.get('header > :nth-child(2) > span')
      .should('be.visible')

    //campos listbox ('Vinculado a fase de', 'Criado por', 'Status')
    cy.get('.cluster-filter-select')
      .should('contain', "Vinculado a fase de")
      .and('contain', 'Criado por')
      .and('contain', 'Status')

    //botões "Filtrar", "Adicionar Template", "Exportar"
    cy.get('.form-wrapper > :nth-child(1) > .actions > .primary')
      .should('contain', "Exportar Templates")
    cy.get('.secondary')
      .should('contain', "Adicionar")
    cy.get('.row > .actions > .primary')
      .should('contain', "Pesquisar")

    //Lista de Registros
    cy.contarLinhasTabela('.cluster-filter > :nth-child(2)')
    cy.validaThead('.cluster-filter > :nth-child(2)', ['Nome', 'Atualizado em', 'Status', 'Criado em'])

    //verifica o index da página
    cy.validarIndex()

  })

  it('TC002 - Pesquisar Nome (+100 Caracteres)', () => {
    cy.escreveEm('.grow > .ng-untouched', '.row > .actions > .primary', caracteres200)
    cy.get('.grow > .ng-valid')
      .should('have.value', caracteres100)
  })

  it('TC003 - Pesquisar Nome Inválido', () => {
    cy.get('.grow > .ng-valid')
      .click()
    cy.get('.grow > .ng-valid')
      .type("N0M3 1N3X15T3NT3")
    cy.get('.row > .actions > .primary')
      .click()
    cy.get('.cluster-filter')
      .should('contain', "Nenhum resultado encontrado")
  })

  it('TC004 - Pesquisar por Filtro "Vinculado a fase de"', () => {
    cy.get('.ng-arrow-wrapper')
      .eq(0)
      .click()
    cy.get('.ng-option')
      .should('contain', "Item não encontrado!")
  })

  it('TC005 - Pesquisar por Filtro "Criado por"', () => {
    cy.get('.ng-arrow-wrapper')
      .eq(1)
      .click()
    cy.get('.ng-option-label')
      .should("contain", 'ADMIN')
  })

  it('TC006 - Pesquisar por Filtro "Status" Ativo', () => {
    cy.get('.ng-arrow-wrapper')
      .eq(2)
      .click()

    cy.get('.ng-option-label')
      .eq(0)
      .should('contain', "Ativo")
      .click()
    
    cy.get('.list-item-multiselect > :nth-child(1)')
      .should('contain', 'Ativo')

    cy.get('.row > .actions > .primary')
      .click()

    cy.wait(1000)

    cy.get('.cluster-filter')
      .find('table') 
      .find('tbody > tr > :nth-child(3)')
      .each(($cell) => {
        const cellText = $cell.text().trim();
        expect(cellText).to.equal('Ativo');
    });
    
  })

  it('TC007 - Pesquisar por Filtro "Status" Inativo', () => {
    cy.get('.ng-arrow-wrapper')
      .eq(2)
      .click()
    
    cy.get('.ng-option-label')
      .eq(1)
      .should('contain', "Inativo")
      .click()
    
    cy.get('.list-item-multiselect > :nth-child(1)')
      .should('contain', 'Inativo')

    cy.get('.row > .actions > .primary')
      .click()

    cy.wait(1000)

    cy.get('.cluster-filter')
      .find('table') 
      .find('tbody > tr > :nth-child(3)')
      .each(($cell) => {
        const cellText = $cell.text().trim();
        expect(cellText).to.equal('Inativo');
      });
  })

  it('TC008 - Pesquisar por Filtro de Data', () => {

    const dataCampo1 = getTodayDate(-18)
    const dataCampo2 = getTodayDate()

    cy.get('.mb-3 > date-picker.ng-untouched > .input-date-picker > img')
      .click()
    cy.wait(200) 
    cy.get('[aria-label="'+ dataCampo1 +'"] > .btn-light')
      .click({force: true})

    cy.wait(500) 

    cy.get('date-picker.ng-untouched > .input-date-picker > img')
      .click()
    cy.wait(200) 
    cy.get('[aria-label="'+ dataCampo2 +'"] > .btn-light')
      .click({force: true})

  })

  it('TC009 - Limpar Filtro "Status" Ativo Pesquisa', () => {
    cy.get('.ng-arrow-wrapper')
      .eq(2)
      .click()
    
    cy.get('.ng-option-label')
      .eq(0)
      .should('contain', "Ativo")
      .click({force:true})
    
    cy.get('.list-item-multiselect > :nth-child(1)')
      .should('contain', 'Ativo')

    cy.get('.row > .actions > .primary')
      .click()

    cy.limparFiltro()

    cy.get('.list-item-multiselect')
      .should('not.be.visible')
  })

  it('TC010 - Limpar Filtro "Status" Inativo Pesquisa', () => {
    cy.get('.ng-arrow-wrapper')
      .eq(2)
      .click()
    
    cy.get('.ng-option-label')
      .eq(1)
      .should('contain', "Inativo")
      .click()
    
    cy.get('.list-item-multiselect > :nth-child(1)')
      .should('contain', 'Inativo')

    cy.get('.row > .actions > .primary')
      .click()

    cy.limparFiltro()

    cy.get('.list-item-multiselect')
      .should('not.be.visible')

  })


  // it.only('TC011 - Limpar Pesquisa por Filtro "Vinculado a fase de"', () => {
  //   cy.get('.ng-arrow-wrapper')
  //     .eq(0)
  //     .click()
  //   cy.get('.ng-option')
  //     .should('contain', "Item não encontrado!")
  // })


  it('TC012 - Limpar Pesquisa por Filtro "Criado por"', () => {
    cy.get('.ng-arrow-wrapper')
      .eq(1)
      .click()

    cy.get('.ng-option-label')
      .should("contain", 'ADMIN')
      .click()
    
    cy.get('.item-multiselect').should('be.visible')
    
    cy.filtrar()
    cy.limparFiltro()

    cy.get('.list-item-multiselect')
      .should('not.be.visible')
  })

  it('TC013 - Botão Adicionar Template', () => {
    cy.get('.secondary')
      .click()
    cy.get('.chore > span')
      .should('contain', "Cadastre os templates de e-mail que serão utilizados dentro das etapas do sistema")
  })

  it('TC014 - Botão Exportar Template', () => {
    cy.get('.form-wrapper > :nth-child(1) > .actions > .primary')
      .click()
    cy.get('.chore > span')
      .should('contain', "Cadastre os templates de e-mail que serão utilizados dentro das etapas do sistema")
  })

})

