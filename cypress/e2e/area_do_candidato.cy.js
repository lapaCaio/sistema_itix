describe('Área do Candidato',() => {


beforeEach('Entrar na Página', () => {
    cy.visit('/')

    cy.get('app-home > button')
        .click({force:true})

    cy.get('#nome')
        .type('Lorem Ipsum')
    cy.get('#sobrenome')
        .type('Da Silva')
    cy.get('#email')
        .type('petihiw723@avastu.com')
    cy.get('#telefone')
        .type('64996761672')
    cy.get('#cpf')
        .type('794.708.560-90')
    cy.get('.input-date-picker > img')
        .click({force:true})
        .then(() => {
            cy.get('.ngb-dp-footer > :nth-child(3)')
                .click({force:true})
        })
    
    cy.get('.btn')
        .click({force:true})
    
    cy.get('#cep')
        .type('31230640')   
    cy.get('#complemento')
        .type('Lorem Ipsum Dollor Siamet')
    cy.get('#numero')
        .type('150')  
    
    cy.get(':nth-child(2) > .btn')
        .click({force:true}) 

    cy.get('#status > .ng-select-container > .ng-arrow-wrapper')
        .click()
        .then(() => {
            cy.get('.ng-option-label')
                .eq(1)
                .click()
        })
    
    cy.get('#formacao > .ng-select-container > .ng-arrow-wrapper')
        .click()
        .then(() => {
            cy.get('.ng-option-label')
                .eq(1)
                .click()
        })

    cy.get('#instituicao')
        .type('Lorem Ipsum')
    
    cy.get('.btn-row > :nth-child(2) > .btn')
        .click({force:true})
    
    cy.get('.input-date-picker > img')
        .click()
        .then(() => {
            cy.get('.ngb-dp-footer > :nth-child(3)')
                .click()
        })

    cy.get('.btn-row > :nth-child(2) > .btn')
        .click()

})
it('TC058 - Teste Adicionar Experiência Profissional', () => {
    cy.get('.card-curriculo')
        .contains('Adicionar experiência')
        .click()
    
    cy.wait(1000)
    
    cy.get('.form-collapse')    
        .should('contain','Experiência 01')
        .and('contain','#empresa')
        .and('contain','#cargo')
        .and('contain','#descricaoAtividade')
        .and('contain','#dataInicio')
        .and('contain','#dataTermino')
})


// TC058 - Teste Adicionar Experiência profissional
// Dado que estou na etapa de Experiência Profissional
// Quando clico no botão 'Adicionar experiência'
// Então deve aparecer um subtítulo 'Experiência' mais um numero correspondente com as experiências adicionadas
// e deve aparecer 3 campos de texto
// 'Empresa'
// 'cargo'
// 'Descrição das atividades realizadas'
// e 2 campos de data
// 'Data de Início'
// 'Data de Término'

// TC059 - Teste Validar campos
// Dado que estou na etapa de Experiência Profissional após clicar no botão 'Adicionar experiência'
// Quando não preencho nenhum campo e clico em 'Avançar'
// Então abaixo dos campos obrigatórios devera aparecer um aviso Campos de preenchimento obrigatório

// TC060 - Teste Campos validos
// Dado que estou na etapa de Experiência Profissional após clicar no botão 'Adicionar experiência'
// Quando preencho os campos corretamente e clico em 'Adicionar experiência'
// Então deve ser possível adicionar mais uma Experiência Profissional

// TC061 - Teste Remover Experiência
// Dado que estou na etapa de Experiência Profissional após clicar no botão 'Adicionar experiência'
// Quando clico no Botão 'Remover experiência'
// Então deve remover as informações da experiência removida

// TC062 - Teste Avançar etapa
// Dado que estou na etapa de Experiência Profissional após clicar no botão 'Adicionar experiência'
// Quando preencho os campos corretamente e clico em 'Avançar'
// Então devo seguir para a próxima etapa

// TC063 - Teste Habilidades
// Dado que estou na etapa de Experiências Profissionais com tudo preenchido corretamente
// Quando clico em avançar
// Então deve se exibir a etapa de Habilidades com dois campos multiseleção hard skills e soft skills e
// um botão Enviar Currículo

// TC064 - Teste Hard Skills
// Dado que estou na etapa de Habilidades
// Quando clico no campo hard skills
// Então deve aparecer uma lista com varias opções em que o usuário poderá selecionar ate 5

// TC065 - Teste Soft Skills
// Dado que estou na etapa de Habilidades
// Quando clico no campo hard skills
// Então deve aparecer uma lista com varias opções em que o usuário poderá selecionar ate 5

// TC066 - Teste enviar currículo
// Dado que estou na etapa de Habilidades
// Quando clico no botão enviar currículo
// Então então deve aparecer um modal escrito com o titulo 'sucesso' e
// subtítulo 'currículo enviado com sucesso'
// e um botão 'voltar'


})