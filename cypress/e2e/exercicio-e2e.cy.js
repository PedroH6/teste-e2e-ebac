/// <reference types="cypress" />

import  produtoPage from "../support/page_objects/nome-funcionliada.page"

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      produtoPage.visitarUrl()
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    cy.fixture('produto').then(dados => {
        produtoPage.buscarProduto(dados[0].nomeProduto)
        produtoPage.addProdutoCarrinho(dados[0].tamanho, dados[0].Cor, dados[0].quantidade)
    })
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()

    cy.fixture('checkout').then(dados => {
        cy.get('#billing_first_name').type(dados[0].nome)
        cy.get('#billing_last_name').type(dados[0].sobreNome)
        cy.get('#billing_address_1').type(dados[0].endereço)
        cy.get('#billing_city').type(dados[0].cidade)
        cy.get('#billing_postcode').type(dados[0].cep)
        cy.get('#billing_phone').type(dados[0].telefone)
        cy.get('#billing_email').type(dados[0].email)
    })
    cy.get('#payment_method_cheque').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()

    cy.get('.woocommerce-notice').should('exist')
  });


})