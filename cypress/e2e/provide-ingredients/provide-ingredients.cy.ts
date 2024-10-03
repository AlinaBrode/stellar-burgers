
import fakeData from "../../../src/data/ingredients.json";

describe("test providing ingredients", () => {
  it("providing ingredients", () => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          data: fakeData
        }
      })
    }).as('mockedAPI');

    cy.visit('http://localhost:4000');

    cy.wait("@mockedAPI");

  });

  it("add ingredient", () => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          data: fakeData
        }
      })
    }).as('mockedAPI');

    cy.visit('http://localhost:4000');

    cy.wait("@mockedAPI");

    const button = cy.get('.add-button-643d69a5c3f7b9001cfa093f');

    button.contains('Добавить');

    cy.get('.constructor-item-cy-643d69a5c3f7b9001cfa093f').should('not.exist');

    button.click();

    cy.get('.constructor-item-cy-643d69a5c3f7b9001cfa093f').should('exist');
  });

  it("test open modal", () => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          data: fakeData
        }
      })
    }).as('mockedAPI');

    cy.visit('http://localhost:4000');

    cy.wait("@mockedAPI");

    const ingredient_icon = cy.get('a[href*="643d69a5c3f7b9001cfa0940"]');

    cy.location('pathname').should('eq', '/');

    ingredient_icon.click();

    cy.location('pathname').should('eq', '/ingredients/643d69a5c3f7b9001cfa0940');

    cy.get('button svg path[d="M3.29289 3.29289C3.68342 2.90237 4.31658 2.90237 4.70711 3.29289L12 10.5858L19.2929 3.29289C19.6834 2.90237 20.3166 2.90237 20.7071 3.29289C21.0976 3.68342 21.0976 4.31658 20.7071 4.70711L13.4142 12L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L12 13.4142L4.70711 20.7071C4.31658 21.0976 3.68342 21.0976 3.29289 20.7071C2.90237 20.3166 2.90237 19.6834 3.29289 19.2929L10.5858 12L3.29289 4.70711C2.90237 4.31658 2.90237 3.68342 3.29289 3.29289Z"]').click();

    cy.location('pathname').should('eq', '/');

  });


});

