describe("template spec", () => {
  it("get", () => {
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
        (user) => user.email == "michael.lawson@reqres.in"
      );
      expect(emailMichaelUser).to.exist;
      expect(emailMichaelUser.id).to.eq(7);

      console.log(emailMichaelUser);
    });
  });

  it("Post", () => {
    const newUser = {
      name: "Pepe",
      job: "El mas groso",
    };
    cy.request("Post", "https://reqres.in/api/users", newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.be.an("object");
      expect(response.body.name).to.eq("Pepe");
      expect(response.body).to.include({job: "El mas groso"});
      expect(response.body).to.have.property("name", newUser.name);
    });
  });
});
