describe("template spec", () => {
  it("passes", () => {
    // Get
    cy.request("Get", "https://reqres.in/api/users?page=2").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array");

      expect(response.body.data[0].id).to.eq(7);

      const idUser = response.body.data[0].id;
      expect(idUser).to.eq(7);

      const users = response.body.data;
      const emailMichaelUser = users.find(
        (users) => users.email == "michael.lawson@reqres.in"
      );

      cy.pause();
      //tomorrow i will see how debbuging
      expect(emailMichaelUser).to.exist;
      console.log(emailMichaelUser);
    });
  });
});
