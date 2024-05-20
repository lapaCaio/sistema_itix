/// <reference types="Cypress" />   

const caracteres50 = "Lorem ipsum dolor sit amet, consectetur adipiscin."
const caracteres200 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra nisl et egestas pulvinar. Cras ultrices, tellus id lacinia vehicula, libero leo sollicitudin turpis, vitae ornare lorem nulla in."
const caracteres100 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam viverra nisl et egestas pulvinar. Cra"

describe('Cadastro de Usuário - Cadastrar', () => {
    beforeEach('Entrar na Tela de Cadastrar em Cadastro de Usuário', () => {
        cy.visit('/')
        cy.get('.icon > .ci-slider_03')
            .click()
        cy.get(':nth-child(4) > .menu > .sub-menu > :nth-child(3)')
            .click()
        cy.get('.secondary')
            .click()
        cy.wait(500)
    })

    it('TC001 - Teste Botão "Voltar"', () => {
        cy.get('.btn-secondary')
            .click({ force: true })
        cy.get('.swal2-popup')
            .should('contain', "Atenção")
            .and('contain', "Os dados serão perdidos, deseja continuar?")
            .and('contain', "Não")
            .and('contain', "Sim")
    })

    it('TC002 - Teste Botão "Voltar" Opção "Não"', () => {
        cy.get('.btn-secondary')
            .click({ force: true })
        cy.get('.swal2-cancel')
            .click({ force: true })

        cy.get('.chore > span')
            .should('contain', 'Cadastro de Usuário')
    })

    it('TC003 - Teste Botão "Voltar" Opção "Sim"', () => {
        cy.get('.btn-secondary')
            .click({ force: true })
        cy.get('.swal2-confirm')
            .click({ force: true })

        cy.get('.secondary')
            .should('contain', "Adicionar Usuário")
    })

    it('TC004 - Teste Quantidade de Caracteres Campo "Nome"', () => {
        cy.get('.col-6 > .inpunt-register')
            .type(caracteres200)
        cy.get('.col-6 > .inpunt-register')
            .should('have.value', caracteres100)
    })

    it('TC005 - Teste Campo Obrigatório Campo "Nome"', () => {
        cy.get('.col-6 > .inpunt-register')
            .click({ force: true })
        cy.get('.chore').click({ force: true })

        cy.get('.col-6 > .ng-star-inserted')
            .should('have.text', "Campo de preenchimento obrigatório")
    })


    it('TC010 - Teste Quantidade de Caracteres Campo CPF', () => {
        cy.get(':nth-child(1) > .col-4 > .inpunt-register')
            .type("012345678910")
        cy.get(':nth-child(1) > .col-4 > .inpunt-register')
            .should('not.have.text', "012345678910")
    })

    it('TC011 - Teste Campo Obrigatório Campo "CPF"', () => {
        cy.get(':nth-child(1) > .col-4 > .inpunt-register')
            .click({ force: true })

        cy.get('.chore')
            .click({ force: true })

        cy.get('.col-4 > .ng-star-inserted')
            .should('have.text', "Campo de preenchimento obrigatório")
    })

    it('TC012 - Teste Entrada de Letras Campo CPF', () => {
        cy.get(':nth-child(1) > .col-4 > .inpunt-register')
            .type("Lorem Ipsum")
        cy.get(':nth-child(1) > .col-4 > .inpunt-register')
            .should('not.have.text', "Lorem Ipsum")
    })
    it('TC013 - Teste Máscara de Campo CPF', () => {
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
    })

    it('TC014 - Teste de Validação de CPF Inválido', () => {
        let cpf_invalido = '123.456.789-10'
        cy.get(':nth-child(1) > .col-4 > .inpunt-register')
            .type(cpf_invalido)
        cy.get(':nth-child(1) > .col-4 > .inpunt-register')
            .should('have.value', cpf_invalido)

        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.col-4 > .ng-star-inserted')
            .should('be.visible')
            .and('have.text', "Número de CPF inválido")
    })

    it('TC015 - Teste Alfanumérico Campo "Email"', () => {
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
    })

    it('TC016 - Teste Campo Obrigatório Campo "Email"', () => {
        cy.get(':nth-child(2) > :nth-child(1) > .inpunt-register')
            .click({ force: true })
        cy.get('.chore').click({ force: true })

        cy.get('form.ng-pristine > :nth-child(2) > :nth-child(1) > .ng-star-inserted')
            .should('have.text', "Campo de preenchimento obrigatório")
    })

    it('TC017 - Teste Quantidade de Caracteres Campo "Email"', () => {
        cy.get(':nth-child(2) > :nth-child(1) > .inpunt-register')
            .type(caracteres200)
        cy.get(':nth-child(2) > :nth-child(1) > .inpunt-register')
            .should('have.value', caracteres100.replace(/ /g, '')) //retira os espaços
    })

    it('TC018 - Teste Validação Campo "Email" Inválido', () => {
        cy.get(':nth-child(2) > :nth-child(1) > .inpunt-register')
            .type(caracteres50)
        cy.get(':nth-child(2) > :nth-child(1) > .inpunt-register')

        cy.get('.chore > span')
            .click({ force: true })

        cy.get('form.ng-invalid > :nth-child(2) > :nth-child(1) > .ng-star-inserted')
            .should("have.text", "Endereço de email inválido")
    })

    it('TC019 - Teste Campo "Sexo" Masculino', () => {
        cy.get('.ng-arrow-wrapper')
            .eq(0)
            .click({ force: false })
        cy.get('.ng-option-label')
            .eq(0)
            .click({ force: true })
    })

    it('TC020 - Teste Campo "Sexo" Feminino', () => {
        cy.get('.ng-arrow-wrapper')
            .eq(0)
            .click({ force: false })
        cy.get('.ng-option-label')
            .eq(1)
            .click({ force: true })
    })

    it('TC021 - Teste Campo Obrigatório Campo "Sexo"', () => {
        cy.get('.ng-arrow-wrapper')
            .eq(0)
            .click({ force: false })

        cy.get('.chore')
            .click({ force: true })

        cy.get(':nth-child(2) > :nth-child(2) > .ng-star-inserted')
            .should('have.text', "Campo de preenchimento obrigatório")
    })

    it('TC022 - Teste Campo Obrigatório Campo "Perfil"', () => {
        cy.get('.ng-arrow-wrapper')
            .eq(1)
            .click({ force: false })

        cy.get('.chore')
            .click({ force: true })

        cy.get('form.ng-pristine > :nth-child(3) > :nth-child(1) > .ng-star-inserted')
            .should('have.text', "Campo de preenchimento obrigatório")
    })

    it('TC023 - Teste Campo Obrigatório Campo "Cargo"', () => {
        cy.get('.ng-arrow-wrapper')
            .eq(2)
            .click({ force: false })

        cy.get('.chore')
            .click({ force: true })

        cy.get('form.ng-pristine > :nth-child(3) > :nth-child(2) > .ng-star-inserted')
            .should('have.text', "Campo de preenchimento obrigatório")
    })

    it('TC024 - Teste Campo Obrigatório Campo "Departamento"', () => {
        cy.get('.ng-arrow-wrapper')
            .eq(3)
            .click({ force: false })

        cy.get('.chore')
            .click({ force: true })

        cy.get(':nth-child(3) > :nth-child(3) > .ng-star-inserted')
            .should('have.text', "Campo de preenchimento obrigatório")
    })

    it('TC025 - Teste Campo Obrigatório Campo "Senha"', () => {
        cy.get('.row.ng-untouched > :nth-child(1) > .ng-untouched')
            .click({ force: false })

        cy.get('.chore')
            .click({ force: true })

        cy.get('.d-block')
            .should('have.text', "Campo de preenchimento obrigatório")
    })

    it('TC026 - Teste Campo Obrigatório Campo "Confirmar senha"', () => {
        cy.get('.row.ng-untouched > :nth-child(2) > .ng-untouched')
            .click({ force: false })

        cy.get('.chore')
            .click({ force: true })

        cy.get('.row.ng-pristine > :nth-child(2) > .ng-star-inserted')
            .should('have.text', "Campo de preenchimento obrigatório")
    })

    it('TC027 - Teste de Data Futura Campo Data', () => {
        cy.preencheData('.input-date-picker > img', -10)
    })


    it('TC027 - Teste Salvar Campo "Nome" Vazio', () => {
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
        cy.preencheListboxes(4)
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')
        cy.preencheData('.input-date-picker > img', -10)

        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.chore > span')
            .should('be.visible')
    })
    it('TC028 - Teste Salvar Campo "CPF" Vazio', () => {
        cy.gerarNome('.col-6 > .inpunt-register')
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
        cy.preencheListboxes(4)
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')
        cy.preencheData('.input-date-picker > img', -10)

        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.chore > span')
            .should('be.visible')
    })
    it('TC004 - Teste Salvar Campo "Email" Vazio', () => {
        cy.gerarNome('.col-6 > .inpunt-register')
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
        cy.preencheListboxes(4)
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')
        cy.preencheData('.input-date-picker > img', -10)

        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.chore > span')
            .should('be.visible')
    })
    it('TC029 - Teste Salvar Campo "Sexo" Vazio', () => {
        cy.gerarNome('.col-6 > .inpunt-register')
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
        cy.preencheListboxes(4)
        cy.get('.ng-clear-wrapper')
            .eq(0)
            .click({ force: true })
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')
        cy.preencheData('.input-date-picker > img', -10)

        cy.get('.chore > span').click({ force: true })
        cy.get('.chore > span').should('be.visible')
    })
    it('TC030 - Teste Salvar Campo "Data de Nascimento" Vazio', () => {
        cy.gerarNome('.col-6 > .inpunt-register')
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
        cy.preencheListboxes(4)
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')

        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.chore > span')
            .should('be.visible')
    })
    it('TC031 - Teste Salvar Campo "Perfil" Vazio', () => {
        cy.gerarNome('.col-6 > .inpunt-register')
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
        cy.preencheListboxes(4)
        cy.get('.ng-clear-wrapper')
            .eq(1)
            .click({ force: true })
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')
        cy.preencheData('.input-date-picker > img', -10)

        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.chore > span')
            .should('be.visible')
    })
    it('TC032 - Teste Salvar Campo "Cargo" Vazio', () => {
        cy.gerarNome('.col-6 > .inpunt-register')
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
        cy.preencheListboxes(4)
        cy.get('.ng-clear-wrapper')
            .eq(2)
            .click({ force: true })
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')
        cy.preencheData('.input-date-picker > img', -10)
        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.chore > span')
            .should('be.visible')
    })
    it('TC004 - Teste Salvar Campo "Departamento" Vazio', () => {
        cy.gerarNome('.col-6 > .inpunt-register')
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
        cy.preencheListboxes(4)
        cy.get('.ng-clear-wrapper')
            .eq(3)
            .click({ force: true })
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')
        cy.preencheData('.input-date-picker > img', -10)

        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.chore > span')
            .should('be.visible')
    })
    it('TC033 - Teste Salvar Campo "Senha" Vazio', () => {
        cy.gerarNome('.col-6 > .inpunt-register')
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
        cy.preencheListboxes(4)
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.get('.row.ng-star-inserted')
            .find('.ng-dirty')
            .eq(0)
            .click()
            .clear()
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')
        cy.preencheData('.input-date-picker > img', -10)


        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.chore > span')
            .should('be.visible')
    })
    it.only('TC034 - Teste Salvar Campo Senha com Valores Diferentes', () => {
        cy.gerarNome('.col-6 > .inpunt-register')
        cy.gerarCPF(':nth-child(1) > .col-4 > .inpunt-register')
        cy.preencheEmailValido(':nth-child(2) > :nth-child(1) > .inpunt-register')
        cy.preencheListboxes(4)
        cy.gerarSenha('.row.ng-untouched > :nth-child(1) > .ng-untouched',
            '.row.ng-untouched > :nth-child(2) > .ng-untouched')
        cy.get('.row.ng-star-inserted > :nth-child(1) > .ng-dirty')
            .clear()
        cy.checkBox('.form-check-input')
        cy.estaMarcada('.form-check-input')
        cy.preencheData('.input-date-picker > img', -10)

        cy.get('.row.ng-star-inserted > :nth-child(2) > .ng-star-inserted')
            .should('have.text', "As senhas não são iguais")
        cy.get('.chore > span')
            .click({ force: true })
        cy.get('.chore > span')
            .should('be.visible')
    })

    //faltam testar as senhas que não estão de acordo com a mascara de senhas
})