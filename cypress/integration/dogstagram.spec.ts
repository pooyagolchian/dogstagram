/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
/// <reference types="cypress" />

import {
  mockedDogsEndpoint,
  mockedDogInfoEndpoint,
  mockedFavDogEndpoint,
} from '../mock/api'

describe('Dogstagram E2E testing', () => {
  it('should render all dogs and all element', () => {
    mockedDogsEndpoint()
    cy.visit('/')
    cy.get('[data-testid="logo"]').should('exist')
    cy.location('pathname').should('eq', '/')
  })

  it('should click on favorite and add to favorites', () => {
    cy.get('[data-testid="favorite-btn"]').should('exist')
    cy.get('[data-testid="favorite-btn"]').should(
      'have.class',
      'btn btn-sm btn-success col-auto'
    )
    cy.get('[data-testid="favorite-btn"]').click()
    const options = {
      method: 'POST',
      url: `https://api.thedogapi.com/v1/favourites`,
      headers: {
        'x-api-key': Cypress.env.token,
      },
      body: {
        image_id: 'buxVXCo9V',
        sub_id: 'User-123',
      },
      failOnStatusCode: false,
    }
    cy.request(options).then((response) => {
      if (response.status === 200) {
        expect(response).property('body').to.contain({
          message: 'SUCCESS',
        })
      }
      if (response.status === 400) {
        expect(response).property('body').to.contain({
          level: 'info',
          message:
            'DUPLICATE_FAVOURITE - favourites are unique for account + image_id + sub_id',
          status: 400,
        })
      }
    })
  })

  it('should click on see more btn and test the page', () => {
    mockedDogInfoEndpoint()
    cy.get('[data-testid="seemore-btn"]').should('exist')
    cy.get('[data-testid="seemore-btn"]').click()
    cy.location('pathname').should('eq', '/dog/info/buxVXCo9V')
  })

  it('should click on favorite link and test favorite page', () => {
    cy.get('[data-testid="favorite-link"]').should('exist')
    cy.get('[data-testid="favorite-link"]').click()
    cy.location('pathname').should('eq', '/favorites')
  })

  it('should click on favorite and test unfavorite', () => {
    cy.visit('/favorites')
    mockedFavDogEndpoint()
    cy.location('pathname').should('eq', '/favorites')
    cy.get('[data-testid="unfavorite-btn"]').click()
    cy.get('[data-testid="unfavorite-btn"]').should('not.exist')
  })
})
