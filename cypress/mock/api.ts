/// <reference types="cypress" />
export const mockedDogsEndpoint = () => {
  cy.intercept(
    {
      method: 'GET',
      url: 'https://api.thedogapi.com/v1/images/search?limit=100&page=10&order=Desc',
    },
    { fixture: '../fixtures/dogs.json' }
  )
}

export const mockedDogInfoEndpoint = () => {
  cy.intercept(
    {
      method: 'GET',
      url: 'https://api.thedogapi.com/v1/images/rkZRggqVX',
    },
    { fixture: '../fixtures/dogs.json' }
  )
}

export const mockedFavDogEndpoint = () => {
  cy.intercept(
    {
      method: 'GET',
      url: 'https://api.thedogapi.com/v1/favourites',
    },
    { fixture: '../fixtures/fav-dog.json' }
  )
}
