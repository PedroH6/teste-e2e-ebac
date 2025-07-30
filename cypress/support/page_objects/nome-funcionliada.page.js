class produtoPage {

     visitarUrl() {
        cy.visit('produtos')
    }

    buscarProduto(nomeProduto) {
        cy.get('.product-block')
        .contains(nomeProduto)
        .click()
    }
    
    addProdutoCarrinho(tamnho, cor, quantidade) {
        cy.get(`.button-variable-item-${tamnho}`).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)

        cy.get('.single_add_to_cart_button').click() 
    }

}

export default new produtoPage()