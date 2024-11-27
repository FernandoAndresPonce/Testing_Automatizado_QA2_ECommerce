
describe('🔬 US 001 - TS 001 - Redireccion - Acceso a la Página Principal de Administración de FastFood', () => {

  it('US 001 - TS 001 - TC 001 - Validar, redireccionar a la Interfaz Principal de Administración, cuando se introduce la URL correspondiente', () => {

    cy.viewport(1920, 1080);
    cy.visit("http://desarrollowebecommerce.somee.com/");
    cy.get("div.popup-buttons>#ContentPlaceHolder1_lbHome").should("be.visible");
    cy.get("div.popup-buttons>#ContentPlaceHolder1_lbHome").click();
    // cy.url().should("have.text", "/User/Default.aspx");
    
  })
})