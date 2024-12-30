describe('remark', () => {
  it('passes', () => {
    cy.visit('https://www.mercadolibre.com.ar/')

    // importante para detectar tooltips  
    cy.get('div.nav-menu > ul.nav-menu-list > li.nav-menu-item > a')
  .contains('Categorías').trigger('mouseover');
  })
})