const caracteres50 = "Lorem ipsum dolor sit amet, consectetur adipiscin."
const caracteres200 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra nisl et egestas pulvinar. Cras ultrices, tellus id lacinia vehicula, libero leo sollicitudin turpis, vitae ornare lorem nulla in."
const caracteres100 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra nisl et egestas pulvinar. Cra"

const frase = "The quick brown fox jumps over the lazy dog and tragically dies."

/// <reference types="Cypress" />

describe('Cadastro de Usuários - Pesquisar', () => {

    beforeEach('Entrar em Cadastro de Usuário', () => {
        cy.visit('/')
        cy.get('.icon > .ci-slider_03')
            .click()
        cy.get(':nth-child(4) > .menu > .sub-menu > :nth-child(3)')
            .click()
        
    })

    it('TC001 - Verificar Página', () => {
        cy.get('#content')
            .should('contain', "Administração")
            .and('contain', "Usuário")
        cy.get('table')
            .should('be.visible')
        cy.get('.secondary')
            .should('be.visible')   
            .and('not.be.disabled')
        cy.get('.btn')
            .should('be.visible')
            .and('not.be.disabled')
        cy.get('.cluster-filter-select')
            .should('be.visible')
            .and('not.be.disabled')
        cy.get('#multiSelectPerfil > .custom > .ng-select-container')
            .should('be.visible')
            .and('not.be.disabled')
        cy.get('#multiSelectCargo > .custom > .ng-select-container')
            .should('be.visible')
            .and('not.be.disabled')
        cy.get('#multiSelectDepartamento > .custom > .ng-select-container')
            .should('be.visible')
            .and('not.be.disabled')
    })
    it('TC002 - Botão Adicionar Usuário', () =>{
        cy.get('.secondary')
            .should('be.visible')
            .and('not.be.disabled')
            .click()
        cy.get('.chore > span')
            .should('have.text', "Cadastro de Usuário")
    })

    it('TC002 - Campo "Nome de Usuário" Alfanumérico', () => {
        cy.get('.col > .ng-untouched')
            .type('@bCd3FGh1J3 09*&%$-+=?/_')
        cy.get('.col > .ng-valid')  
            .should('have.value', '@bCd3FGh1J3 09*&%$-+=?/_')
    })

    it('TC003 - Campo "Nome de Usuário" > 100 Caracteres', () => {
        cy.get('.col > .ng-untouched')
            .type(caracteres200)
        cy.get('.col > .ng-valid')  
            .should('have.value', caracteres100)
    })

    it('TC004 - Campo "Nome de Usuário" Inválido', () => {
        cy.get('.col > .ng-untouched')
            .type(frase)
        cy.get('.btn')
            .click()
        cy.get('h5')
            .should('have.text', "Nenhum resultado encontrado")
    })

    it('TC005 - Campos da Lista de Usuários', () => {
        const expectedTexts = ["Nome de Usuário", "Perfil", "Cargo", "Departamento", "Último Login"];

        cy.get('table')
            .find('thead > tr')
            .then($tr => {
                for (let i = 0; i < 5; i++) {
                    cy.wrap($tr)
                        .find(`:nth-child(${i + 1})`)
                        .invoke('text')
                        .should('eq', expectedTexts[i]);
                }
            });

    })

    it('TC006 - Limpar Filtros', () => {
        cy.get('.ng-arrow-wrapper')
            .each(($arrowWrapper, index) => {
                cy.wrap($arrowWrapper) 
                    .click()
                cy.get('.ng-option-label')
                    .each(($optionLabel) => {
                    cy.wrap($optionLabel)
                        .click({force: true})
            })
        })

        cy.get('header > div > span')
            .click()

        cy.get('.item-multiselect')
            .should('not.exist')   
    })

    it('TC007 - Tela de Visualização/Edição', () => {
        cy.get('tbody > :nth-child(1) > .description')
            .click()
        cy.get('h3')
            .should('contain', 'Usuários')
        cy.get('.outline')
            .should('contain', 'Retornar')
        cy.get('.ng-star-inserted > .form-check-input')
            .click({force:true})
        cy.get('.form-wrapper')
            .should('contain', 'Nome')
            .and('contain', 'CPF')
            .and('contain', 'Email')
            .and('contain', 'Sexo')
            .and('contain', 'Data de Nascimento')
            .and('contain', 'Perfil')
            .and('contain', 'Cargo')
            .and('contain', 'Departamento')
            .and('contain', 'Senha')
            .and('contain', 'Confirmar Senha')
            .and('contain', 'Alterar Senha')
            .and('contain', 'Alterar senha no primeiro acesso')
            .and('contain', 'Voltar')
            .and('contain', 'Editar')
    })

    it('TC008 - Filtro "Perfil"', () => {
        cy.get('.ng-arrow-wrapper')
        .eq(0)
        .click()
        cy.get('.ng-option-label')
        .eq(0)
        .click()
        cy.get('.btn')
            .click({force:true})

        cy.wait(500)

        cy.get('.cluster-filter')
        .find('table') 
        .find('tbody > tr > :nth-child(2)')
        .each(($cell) => {
            const cellText = $cell.text().trim();
            expect(cellText).to.equal('Administrador');
        });
    })

    it('TC009 - Filtro "Cargo"', () => {
        cy.get('.ng-arrow-wrapper')
        .eq(1)
        .click()
        cy.get('.ng-option-label')
        .eq(7)
        .click()
        cy.get('.btn')
            .click({force:true})

        cy.wait(500)

        cy.get('.cluster-filter')
        .find('table') 
        .find('tbody > tr > :nth-child(3)')
        .each(($cell) => {
            const cellText = $cell.text().trim();
            expect(cellText).to.equal('Analista QA');
        });
    })

    it('TC009 - Filtro "Departamento"', () => {
        cy.get('.ng-arrow-wrapper')
        .eq(2)
        .click()
        cy.get('.ng-option-label')
        .eq(7)
        .click()
        cy.get('.btn')
            .click({force:true})

        cy.wait(500)

        cy.get('.cluster-filter')
            .find('table') 
            .find('tbody > tr > :nth-child(4)')
            .each(($cell) => {
                const cellText = $cell.text().trim();
                expect(cellText).to.equal('Recurso Humano');
            });
    })

    it('TC010 - Pesquisa com Entrada Válida', () => {
        cy.fazPesquisa('.col > .ng-untouched', '.btn', "lorem Ipsum")
    })

    it('TC011 - Pesquisa com Entrada Vazia', () => {
        cy.fazPesquisa('.col > .ng-untouched', '.btn', " ")   
    })

    it('TC012 - Pesquisa com Entrada Inválida', () => {
        cy.fazPesquisa('.col > .ng-untouched', '.btn', "n0M3 Inv@L1d0") 

        cy.get('h5')
            .should('have.text', "Nenhum resultado encontrado")
    })

    it('TC010 - Teste Campo "Pesquisa" Quantidade de Caracteres', () => {
        cy.fazPesquisa('.col > .ng-untouched', '.btn', caracteres200) 

        cy.get('.col > .ng-valid').should("have.value", caracteres100)
    })

    

    


})