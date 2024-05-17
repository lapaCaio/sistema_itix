// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// No arquivo de comandos do Cypress (cypress/support/commands.js)

function getTodayDate(days = 0) {
  const today = new Date();
  today.setDate(today.getDate() + days);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('pt-BR', options);

  return formattedDate;
}

function gerarSenha() {
  const length = 8;
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let chars = lowercase + uppercase + numbers + specialChars;
  let password = '';

  // Adiciona pelo menos um caractere de cada categoria
  password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

  // Preenche o restante da senha com caracteres aleatórios
  for (let i = 4; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Embaralha a senha
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
}

function gerarCPF() {
  // Gera um número aleatório entre 0 e 9
  function numeroAleatorio() {
    return Math.floor(Math.random() * 10);
  }

  // Gera um array com 9 números aleatórios
  const numerosCPF = Array.from({ length: 9 }, numeroAleatorio);

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += numerosCPF[i] * (10 - i);
  }
  let primeiroDigito = 11 - (soma % 11);
  if (primeiroDigito >= 10) {
    primeiroDigito = 0;
  }

  // Adiciona o primeiro dígito verificador ao array
  numerosCPF.push(primeiroDigito);

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += numerosCPF[i] * (11 - i);
  }
  let segundoDigito = 11 - (soma % 11);
  if (segundoDigito >= 10) {
    segundoDigito = 0;
  }

  // Adiciona o segundo dígito verificador ao array
  numerosCPF.push(segundoDigito);

  // Formata o CPF
  const cpfFormatado = numerosCPF.slice(0, 3).join('') + '.' +
    numerosCPF.slice(3, 6).join('') + '.' +
    numerosCPF.slice(6, 9).join('') + '-' +
    numerosCPF.slice(9).join('');

  return cpfFormatado;
}

function gerarEmail() {
  const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let email = '';

  // Adiciona um prefixo aleatório ao email
  for (let i = 0; i < 6; i++) {
    email += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  // Adiciona um domínio fixo ao email
  email += '@example.com';

  return email;
}

function gerarNome() {
  const adjectives = ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Purple', 'Pink', 'Black', 'White', 'Gray'];
  const nouns = ['Dog', 'Cat', 'Bird', 'Fish', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Monkey', 'Snake'];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

Cypress.Commands.add('contarLinhasTabela', (tabela) => {
    cy.get('table')
        .find('tr')
        .should('to.have.length',11)
  });

Cypress.Commands.add('validaThead', (tabela, textos) => {  
    cy.get(tabela).within(() => {
        cy.get('thead').within(() => {
        textos.forEach((texto, index) => {
            cy.get('th').eq(index).should('have.text', texto);
        });
        });
    });      
})

Cypress.Commands.add('validarIndex', () => {
    cy.get('.pages').within(() => {
      cy.get(':nth-child(n)').each(($index, index, $list) => {
        
        cy.get('.selected').should('exist'); // Verificar se a página está selecionada

        if (index === $list.length - 1) {
          return false; // Parar o loop quando chegar ao último índice
        }
        cy.wrap($index).click();
      });
    });
});

Cypress.Commands.add('escreveEm', (campo, botao, texto) => {
    if(texto === 'LI'){
        texto = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    cy.get(campo).type(''+texto+'')
    cy.wait(500)
    cy.get(botao).click()
})

Cypress.Commands.add('filtrar', () => {
  cy.get('.row > .actions > .primary').click()
})

Cypress.Commands.add('limparFiltro', () => {
  cy.get('header > :nth-child(2) > span').click()
})

Cypress.Commands.add('fazPesquisa', (locatorCampo, locatorBotao, textoPesquisa)=> {
  cy.get(locatorCampo)
    .clear()
    .type(textoPesquisa)
  cy.get(locatorBotao)
    .click()
  cy.wait(500)

  cy.get('.form-wrapper').then(($clusterFilter) => {
      // Check if the cluster filter contains a table
      if ($clusterFilter.find('table').length > 0) {
          cy.get('.cluster-filter table tbody tr').its('length').should('be.at.most', 11);
          cy.comparaNome(textoPesquisa)
      }
      // Check if the cluster filter contains an h2
      else if ($clusterFilter.find('h2').length > 0) {
          cy.get('.no-results').should('be.visible');
      }
  });

})

Cypress.Commands.add('comparaNome', (textoPesquisa) => {
  cy.get('tbody > tr').each(($row) => {
      cy.wrap($row).find('.description').invoke('text').then((text) => {
          expect(text.trim().toLowerCase).to.include(textoPesquisa.toLowerCase);
      });
  });
});


Cypress.Commands.add('habilitarEdicao', () => {
  cy.get('.btn-primary').click()
})

// Cypress.Commands.add('getTodayDate', (days = 0) => {
//   const today = new Date();
//   today.setDate(today.getDate() + days);

//   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//   const formattedDate = today.toLocaleDateString('pt-BR', options);

//   return formattedDate;
// });

Cypress.Commands.add('preencheListbox', (ng_arrow_wrapper) => {
  
  cy.get('.ng-arrow-wrapper').eq(ng_arrow_wrapper).click({force:true})
        
  cy.get('.ng-option-label') // Seleciona todas as labels dentro do submenu
    .then($options => {
        const randomIndex = Math.floor(Math.random() * $options.length) // Gera um índice aleatório
        const randomOption = $options.eq(randomIndex) // Seleciona a opção aleatória
        cy.wrap(randomOption).click() // Clica na opção aleatória
    })
})


Cypress.Commands.add('preencheListboxes', (quantidade_de_listbox) => {
  for(let i = 0; i < quantidade_de_listbox; i++){
    cy.preencheListbox(i)
  }
})

Cypress.Commands.add('preencheEmailValido', (campo_email) => {
    let email_gerado = gerarEmail()
    cy.get(campo_email).type(email_gerado)
    cy.get(campo_email).should('have.value', email_gerado)
})

Cypress.Commands.add('gerarNome', (campo_nome) => {
  let nome_gerado = gerarNome()
  cy.get(campo_nome).type(nome_gerado)
  cy.get(campo_nome).should('have.value', nome_gerado)
})


Cypress.Commands.add('gerarCPF', (campo_cpf) => {
  let cpf_gerado = gerarCPF()
  cy.get(campo_cpf).type(cpf_gerado)
  cy.get(campo_cpf).should('have.value', cpf_gerado)
})

Cypress.Commands.add('gerarSenha', (campo_senha, campo_confirmar_senha) => {
  let senha_gerada = gerarSenha()
  cy.get(campo_senha).type(senha_gerada)
  cy.get(campo_confirmar_senha).type(senha_gerada)
  
})

Cypress.Commands.add('verificaSenha', (campo_senha, campo_confirmar_senha) => {
  let senha_base = cy.get(campo_senha).should('have.value', senha_gerada)
  cy.get(campo_confirmar_senha).should('eq', senha_base)

})


Cypress.Commands.add('checkBox', (checkbox) => {
  cy.get(checkbox).click({force:true})
})
Cypress.Commands.add('estaMarcada', (checkbox) => {
  cy.get(checkbox).should('be.checked')
})
Cypress.Commands.add('naoEstaMarcada', (checkbox) => {
  cy.get(checkbox).should('not.be.checked')
})  

Cypress.Commands.add('preencheData', (campo_data, dias) => {
  cy.get(campo_data)
    .click()
  cy.get('[aria-label="'+ getTodayDate(dias) +'"] > .btn-light')
    .click({force:true})
})










  

  
  
  
  
  